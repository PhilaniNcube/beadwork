"use server";
import "server-only"

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function addSize(prevState: unknown, formData:FormData) {
  const supabase = createClient();

  const product_id = formData.get("product_id") as string;
  const name = formData.get("name") as string;
  const dimensions = formData.get("dimensions") as string;

  // if any of the form data is missing, return an error
  if (!product_id || !name || !dimensions) {
    return {
      status: "error",
      message: "Please provide all required fields",
    }
  }

  const { data, error } = await supabase.from("sizes").insert([
    {
      product_id:Number(product_id),
      name,
      dimensions,
    },
  ]);

  console.log(data, error);

  if (error) {
    return {
      status: "error",
      message: error.message,
    }
  }

  revalidatePath(`/dashboard/products/${product_id}`);
  revalidatePath(`/products/${product_id}`);
  revalidatePath(`/`, "layout");

  return {
    status: "success",
    message: "Size added successfully",
  }
}


export async function deleteSizeAction(formData: FormData) {
  const supabase = createClient();

  const size_id = formData.get("sizeId") as string;

  const { error } = await supabase.from("sizes").delete().eq("id", Number(size_id));

  if (error) {
    return {
      status: "error",
      message: error.message,
    }
  }

    revalidatePath(`/dashboard/products`, "layout");

  return {
    status: "success",
    message: "Size deleted successfully",
  }
}
