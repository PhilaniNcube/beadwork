"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

export async function deleteProductImage(
  prevState: unknown,
  formData: FormData
) {
  const supabase = createClient();

  const imageId = formData.get("image_id");

  if (!imageId) {
    return {
      error: "Image ID is required",
    };
  }

  // Delete image from storage
  const { error: storageError } = await supabase
    .from("product_images")
    .delete()
    .match({ id: Number(imageId) });

  if (storageError) {
    return {
      error: storageError?.message,
    };
  }

  revalidatePath("/dashboard/products", "layout");
  revalidatePath("/dashboard", "layout");

  return {
    success: true,
  };
}
