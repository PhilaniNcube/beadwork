"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export const productImageUploadAction= async (prevState:unknown, formData:FormData) => {

  const supabase = createClient();

  const productId = formData.get("productId") as string;
  const image = formData.get("image")  as string;

  if (!productId || !image) {
    return {
      error: "Missing required fields",
    };
  }

  const { data, error } = await supabase
    .from("product_images")
    .insert([{ product_id: Number(productId), image_url: image }]).select("*");

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/dashboard/products", "page");
  revalidatePath(`/dashboard/products/${productId}`);

  return {
    data,
    message: "Image uploaded successfully",
  };

};
