import { getCategorySlugs } from "@/utils/queries/categories";
import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const categorySlugs = await getCategorySlugs();
  return categorySlugs;
}

export default async function sitemap({
  slug,
}: {
  slug: string;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap

  const BASE_URL = "https://www.glambeads.co.za";

  const categorySlugs = await getCategorySlugs();
  return categorySlugs.map((item) => ({
    url: `${BASE_URL}/categories/${item.slug}`,
    lastModified: new Date().toISOString(),
  }));
}
