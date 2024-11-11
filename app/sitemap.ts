import type { MetadataRoute } from "next";

export default  function sitemap(): MetadataRoute.Sitemap {
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
  ];
}
