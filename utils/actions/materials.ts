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
