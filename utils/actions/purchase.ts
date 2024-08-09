"use server";

import { orderSchema } from "@/schema";
import type { CartProduct } from "@/stores/cart-store";
import { redirect } from "next/navigation";

import { z } from "zod";


type InitializeResponse = {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  }
}

export async function checkoutAction( formData:FormData, order_items:CartProduct[]) {

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
  })

  console.log(JSON.stringify(validatedFields, null, 2))

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
		})


  const data :InitializeResponse = await req.json();

  console.log(JSON.stringify(data, null, 2))

  if(data.status === false) {
    throw new Error(data.message);
  }


  // if the status is true, redirect to the authorization_url
  redirect(data.data.authorization_url)



}
