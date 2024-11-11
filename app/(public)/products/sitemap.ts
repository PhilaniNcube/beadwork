import { getProductSlug, getProductSlugs } from "@/utils/queries/products";
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


  const BASE_URL = "https://www.glambeads.co.za";

  const productSlug = await getProductSlug(slug);

  return [
    {
      url: `${BASE_URL}/products/${productSlug?.slug}`,
      lastModified: new Date().toISOString(),
    },
  ];

}
