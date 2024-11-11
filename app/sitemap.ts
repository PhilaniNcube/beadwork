import { getCategorySlugs } from "@/utils/queries/categories";
import { getProductSlugs } from "@/utils/queries/products";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const BASE_URL = "https://www.glambeads.co.za";
  const productSlugs = await getProductSlugs();

  const categorySlugs = await getCategorySlugs();
  const categories = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/categories/${slug.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const products = productSlugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug.slug}`,
    lastModified: new Date().toISOString(),
  }));


  return [
    {
      url: "https://www.glambeads.co.za",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.glambeads.co.za/category",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.glambeads.co.za/contact",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.glambeads.co.za/about",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.glambeads.co.za/shop",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.glambeads.co.za/login",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.glambeads.co.za/sign-up",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.glambeads.co.za/cart",
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products,
    ...categories,
  ];
}
