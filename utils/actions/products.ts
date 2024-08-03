"use server";

import { productSchema } from "@/schema";
import { createClient } from "../supabase/server";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProductAction(
	prevState: unknown,
	formData: FormData,
) {
	const supabase = createClient();

  const is_featured = formData.get("is_featured")  === "on";

	const validatedFields = productSchema.safeParse({
		title: formData.get("title"),
		description: formData.get("description"),
		stock: formData.get("stock"),
		price: formData.get("price"),
		is_featured: is_featured,
		categories: formData.getAll("categories"),
		materials: formData.getAll("materials"),
	});



	if (!validatedFields.success) {
		return { errors: validatedFields.error.flatten().fieldErrors, status: 400, message: "Invalid data" };
	}

  const slug = slugify(validatedFields.data.title, { lower: true, replacement: "-", strict: true });

  const {data, error} = await supabase.from("products").insert([
    {
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      stock: validatedFields.data.stock,
      price: validatedFields.data.price,
      is_featured: validatedFields.data.is_featured,
      slug,
    }
  ]).select("id").single();

  if (error) {
    return { error: error.details, status: 500, message: error.message };
  }

  const product_id = data.id;

  if(validatedFields.data.categories.length > 0) {

    const categoriesData = await supabase.from("product_categories").insert(validatedFields.data.categories.map((item) => {
      return {
        product_id: product_id,
        category_id: item,
      }
    })).select("*");


  }

  if(validatedFields.data.materials.length > 0) {

  const materialsData = await supabase
			.from("product_materials")
			.insert(
				validatedFields.data.materials.map((item) => {
					return {
						product_id: product_id,
						material_id: item,
					};
				}),
			)
			.select("*");

      console.log(JSON.stringify(materialsData));
  }

  revalidatePath("/products");
  revalidatePath("/dashboard", "layout");
  revalidatePath("/dashboard/products/", "layout");

  redirect(`/dashboard/products/${product_id}`);

  return { status: 200, message: "Product created successfully" };



}
