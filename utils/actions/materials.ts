"use server";

import { materialsSchema } from "@/schema";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export async function createMaterialAction(
	prevState: unknown,
	formData: FormData,
) {
	const supabase = createClient();

	const validatedFields = materialsSchema.safeParse({
		name: formData.get("name") as string,
	});

	console.log(JSON.stringify(validatedFields));
	if (!validatedFields.success) {
		return { errors: validatedFields.error.flatten().fieldErrors, status: 400 };
	}

	const { data, error } = await supabase
		.from("materials")
		.insert([
			{
				name: validatedFields.data.name,
			},
		])
		.select("*");

	if (error) {
		return { error: error.message, status: 400 };
	}

	revalidatePath("/dashboard", "layout");
	revalidatePath("/dashboard/materials");
	revalidatePath("/dashboard/products/create");
	revalidatePath("/products");

	return { data, status: 201 };
}

export async function updateProductMaterialAction(
	prevState: unknown,
	formData: FormData,
) {
	const supabase = createClient();

	// get the product id from the formData
	const product_id = Number(formData.get("product_id"));

	// get the category id from the formData as either
	const material_id = Number(formData.get("material_id"));

	// check if the category is already assigned to the product
	const { data: existingMaterial, error: existingMaterialError } =
		await supabase
			.from("product_materials")
			.select("*")
			.eq("product_id", product_id)
			.eq("material_id", material_id)
			.single();

	// if the material is already assigned to the product, delete the material from the product
	if (existingMaterial) {
		const { error } = await supabase
			.from("product_materials")
			.delete()
			.eq("product_id", existingMaterial.product_id)
			.eq("material_id", existingMaterial.material_id);

		if (error) {
			return { error: error.message, status: 400 };
		}

		revalidatePath(`/dashboard/products/${product_id}`, "layout");
		return { status: 200 };
	}

	// if the category is not already assigned to the product, insert the category to the product
	const { data, error } = await supabase
		.from("product_materials")
		.insert([
			{
				product_id,
				 material_id,
			},
		])
		.select("*");

	if (error) {
		return { error: error.message, status: 400 };
	}

	revalidatePath(`/dashboard/products/${product_id}`, "layout");
}
