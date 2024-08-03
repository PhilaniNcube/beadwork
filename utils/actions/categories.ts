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
