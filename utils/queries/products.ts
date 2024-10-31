import { createClient } from "../supabase/server";



export async function getProducts(page = 1, limit = 10, search = "") {
  const supabase = createClient();

  // Create the values for pagination
  const start = (page - 1) * limit;
  const end = page * limit - 1;

  // Build the query
  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .range(start, end);

  // If a search term is provided, add the search filter
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data: products, error: productsError, count } = await query;

  if (productsError) {
    return {
      error: productsError.message,
    };
  }

  return {
    products,
    count,
  };
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


export const getProductsWithImages = async (page = 1, search = '') => {
const supabase = createClient();
//  create the values for pagination

const start = (page - 1) * 18;
const end = page * 18 - 1;
console.log({ start, end, search });

const {
  data: products,
  error: productsError,
  count,
} = await supabase
  .from("products")
  .select("*, product_images(*)", { count: "exact" })
  .ilike("title", `%${search}%`)
  .range(start, end);

if (productsError) {
  return {
    error: productsError.message,
    products: [],
    count: 0,
  };
}

return {
  products,
  count,
}

}


export async function getProductDetails(slug: string) {
  const supabase = createClient();

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*, product_images(*), categories(*), materials(*)")
    .eq("slug", slug)
    .single();

  if (productError) {
    return {
      error: productError.message,
      product: null,
    };
  }


  return {
    product,
  }

}


export async function getFeaturedProducts() {
  const supabase = createClient();

  const { data: products, error: productsError } = await supabase
			.from("products")
			.select("id, slug, title, price, product_images(*)")
			.eq("is_featured", true).limit(4);

  if (productsError) {
    return [];
  }

  return products;
}


export async function getProductsByCategoryId(id:number) {
  const supabase = createClient();

  // fetch the products from the product_categories table
  const { data: productCategories, error: productCategoriesError } =
    await supabase
      .from("product_categories")
      .select("product_id, products(id, title, price, slug)")
      .eq("category_id", id);

  console.log({ productCategories, productCategoriesError });

  if (productCategoriesError) {
    return [];
  }




  return productCategories.map((item) => {
    return {
      id: item.products?.id,
      title: item.products?.title,
      price: item.products?.price,
      slug: item.products?.slug,
    };
  });
}

export async function getSearchProducts(search = '', page = 1) {
  const supabase = createClient();

	const start = (page - 1) * 10;
  const end = page * 10 - 1;

  const {
    data: products,
    error: productsError,
    count,
  } = await supabase
    .from("products")
    .select("*, product_images(image_url)", { count: "exact" })
    .or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    .range(start, end);

  console.log({ products, productsError });

  if (productsError) {
    return [];
  }

  return products;
}


export type CategoryProductType = {
  id: number | undefined;
  title: string | undefined;
  price: number | undefined;
  slug: string | undefined;
  product_images: string[];
};
