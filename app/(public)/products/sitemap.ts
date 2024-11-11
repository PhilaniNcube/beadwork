import { getProductSlugs } from "@/utils/queries/products";
import type { MetadataRoute } from "next";


export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const productSlugs = await getProductSlugs()
  return productSlugs
}

export default async function sitemap({
  slug,
}: {
  slug: string;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap

  const BASE_URL = "https://www.glambeads.co.za";

  const products = await getProductSlugs();
  return products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date().toISOString(),
  }));
}
