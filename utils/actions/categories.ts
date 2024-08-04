"use server";

import { categorySchema } from "@/schema";
import { createClient } from "../supabase/server";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(prevState:unknown, formData:FormData){
  const supabase = createClient();


  const validatedFields = categorySchema.safeParse({
    name: formData.get("name") as string,
    // parent_category_id: formData.get("parent_category_id") as string || null,
  })


  if(!validatedFields.success){

    return {errors: validatedFields.error.flatten().fieldErrors, status: 400};
  }


  // create a slug from the name field and remove any spaces in the name and special characters
  const slug = slugify(validatedFields.data.name, {lower: true, strict: true});

  const {data, error} = await supabase.from("categories").insert([
    {
      slug,
      name: validatedFields.data.name,
      // parent_category_id: Number(validatedFields.data.parent_category_id) || null
    }
  ]).select("*");


  if(error){
    return {error: error.message, status: 400};
  }

  revalidatePath("/dashboard", "layout");
    revalidatePath("/dashboard/categories");
		revalidatePath("/dashboard/products/create");
		revalidatePath("/products");

  return {data, status: 201};


}


export async function updateProductCategoryAction(prevState:unknown, formData:FormData) {
  const supabase = createClient();

  // get the product id from the formData
  const product_id = Number(formData.get("product_id"));

  // get the category id from the formData as either
  const category_id = Number(formData.get("category_id")) ;


  // check if the category is already assigned to the product
  const {data: existingCategory, error: existingCategoryError} = await supabase.from("product_categories").select("*").eq("product_id", product_id).eq("category_id", category_id).single();

  // if the category is already assigned to the product, delete the category from the product
  if(existingCategory){
    const {error} = await supabase.from("product_categories").delete().eq("product_id", existingCategory.product_id).eq("category_id", existingCategory.category_id);

    if(error){
      return {error: error.message, status: 400};
    }

    revalidatePath(`/dashboard/products/${product_id}`, "layout");
    return {status: 200};
  }

  // if the category is not already assigned to the product, insert the category to the product
  const {data, error} = await supabase.from("product_categories").insert([
    {
      product_id,
      category_id
    }
  ]).select("*");

  if(error){
    return {error: error.message, status: 400};
  }

  revalidatePath(`/dashboard/products/${product_id}`, "layout");

}
