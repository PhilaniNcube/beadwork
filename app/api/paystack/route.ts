import { createClient } from "@/utils/supabase/service";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

type ChargeWebhook = {
	event: "charge.success";
	data: {
		id: number;
		domain: string;
		status: string;
		reference: string;
		amount: number;
		message: string | null;
		gateway_response: string;
		paid_at: string;
		created_at: string;
		channel: string;
		currency: string;
		ip_address: string;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		metadata: any;
		log: {
			time_spent: number;
			attempts: number;
			authentication: string;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			errors: any;
			success: boolean;
			mobile: boolean;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			input: any;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			channel: any;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			history: any;
		};
	};
	fees: number | null;
	customer: {
		id: number;
		first_name: string;
		last_name: string;
		email: string;
		customer_code: string;
		phone: string | null;
		metadata: null;
		risk_action: string;
	};
};

export async function POST(req: Request) {
	const supabase = createClient();
	const reqHeaders = headers();
	const { createHmac } = await import("node:crypto");

	const body: ChargeWebhook = await req.json();

	console.log(JSON.stringify(body, null, 2));
	// update the payment status of the order
	const { data: order, error: order_error } = await supabase
		.from("orders")
		.update({
			status: body.data.status === "success" ? "PROCESSING" : "PENDING",
		})
		.eq("transaction_id", body.data.reference)
		.select("*")
		.single();

	if (order_error) {
		console.error(order_error.message);
		return NextResponse.json({
			status: 400,
			message: "An error occurred",
			data: order_error.message,
			cause: order_error.hint,
		});
	}

	// use the order.id to get the order items
	const { data: order_items, error: order_items_error } = await supabase
		.from("order_items")
		.select("*")
		.eq("order_id", order.id);

	if (order_items_error) {
		console.error(order_items_error.message);
		return NextResponse.json({
			status: 400,
			message: "Could not find order items",
			data: order_items_error.message,
			cause: order_items_error.hint,
		});
	}

	// use a for loop to update the stock of each product
	for (const item of order_items) {
		// get the product
		const { data: product, error: product_error } = await supabase
			.from("products")
			.select("*")
			.eq("id", item.product_id)
			.single();

		if (product_error) {
			return;
		}

		// update the stock
		const { data: updated_product, error: update_error } = await supabase
			.from("products")
			.update({
				stock: product.stock - item.quantity,
			})
			.eq("id", product.id)
			.select("*")
			.single();

		console.log(updated_product);
	}

	return NextResponse.json({
		status: "success",
		message: "Webhook received",
		data: body,
	});
}
