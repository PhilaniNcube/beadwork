import { createClient } from "../supabase/server";

export async function getProducts(page = 1, limit = 10) {
const supabase = createClient();
  //  create the values for pagination

  const start = (page - 1) * limit;
  const end = page * limit;

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .range(start, end);

  if (productsError) {
    return [];
  }

  return products;

}

export async function getProductByID(id: number) {
	const supabase = createClient();

	const { data: product, error: productError } = await supabase
		.from("products")
		.select("*")
		.eq("id", id)
		.single();


	if (productError) {
		throw new Error("Product not found");
	}

  return product;
}

export async function getProductBySlug(slug: string) {
	const supabase = createClient();

	const { data: product, error: productError } = await supabase
		.from("products")
		.select("*")
		.eq("slug", slug)
		.single();

    	if (productError || !product) {
						throw new Error("Product not found");
					}

  return product;
}

export const getProductImages = async (productId: number) => {
 const supabase = createClient();

  const { data: images, error: imagesError } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId);

  if (imagesError) {
    return [];
  }

  return images;

}
