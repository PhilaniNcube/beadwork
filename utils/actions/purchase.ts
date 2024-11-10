"use server";

import { orderSchema } from "@/schema";
import type { CartProduct } from "@/stores/cart-store";
import { redirect } from "next/navigation";

import { z } from "zod";
import { createClient } from "../supabase/server";
import { getCurrentUser } from "../queries/users";
import { size } from "@/app/icon";

type InitializeResponse = {
	status: boolean;
	message: string;
	data: {
		authorization_url: string;
		access_code: string;
		reference: string;
	};
};

export async function checkoutAction(
	formData: FormData,
	order_items: CartProduct[],
) {
	const user = await getCurrentUser();

	if (!user) {
		throw new Error("User not found");
	}

	const email = formData.get("email") as string;
	const phone_number = formData.get("phone_number") as string;
	const first_name = formData.get("first_name") as string;
	const last_name = formData.get("last_name") as string;
	const street_address = formData.get("street_address") as string;
	const city = formData.get("city") as string;
	const postal_code = formData.get("postal_code") as string;
	const total_amount = formData.get("total_amount") as string;

	const validatedFields = orderSchema.safeParse({
		email,
		phone_number,
		first_name,
		last_name,
		street_address,
		city,
		postal_code,
		total_amount,
	});

	console.log(JSON.stringify(validatedFields, null, 2));

	if (!validatedFields.success) {
		throw new Error("Invalid fields");
	}

	const paystack_url = "https://api.paystack.co/transaction/initialize";

	const req = await fetch(paystack_url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.PAYSTACK_PRIVATE_SECRECT}`,
		},
		body: JSON.stringify({
			email: validatedFields.data.email,
			amount: validatedFields.data.total_amount * 100,
			channels: ["card", "eft"],
			currency: "ZAR",
			callback_url: `${process.env.BASE_URL}/checkout/result/success`,
			metadata: {
				cancel_url: `${process.env.BASE_URL}/checkout/result/cancelled`,
				custom_fields: order_items.map((item) => ({
					item_name: item.title,
					item_id: item.id,
					item_price: item.price,
					item_quantity: item.quantity,
					item_image: item.product_images[0].image_url,
					item_slug: item.slug,
				})),
			},
		}),
	});

	const paystack_response: InitializeResponse = await req.json();

	console.log(JSON.stringify(paystack_response, null, 2));

	if (paystack_response.status === false) {
		throw new Error(paystack_response.message);
	}

	const supabase = createClient();

	// create a shipping address
	const { data: shipping_address, error: shipping_error } = await supabase
		.from("shipping_addresses")
		.insert([
			{
				street_address: street_address,
				city: city,
				postal_code: postal_code,
				user_id: user.id,
			},
		])
		.select("*")
		.single();

	if (shipping_error) {
		throw new Error(shipping_error.message);
	}

	// create an order
	const { data: order, error: order_error } = await supabase
		.from("orders")
		.insert([
			{
				email: email,
				phone_number: phone_number,
				first_name: first_name,
				last_name: last_name,
				total_amount: Number(total_amount),
				shipping_address_id: shipping_address.id,
				user_id: user.id,
				status: "PENDING",
				transaction_id: paystack_response.data.reference,
			},
		]).select("*").single();

    if(order_error) {
        throw new Error(order_error.message);
    }


    // create order items
    const order_items_insert = order_items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
    }));

    const { data: order_items_data, error: order_items_error } = await supabase.from("order_items").insert(order_items_insert).select("*");


    console.log(JSON.stringify({ order_items_data, order_items_error }, null, 2));

	// if the status is true, redirect to the authorization_url
	redirect(paystack_response.data.authorization_url);
}
