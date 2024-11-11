import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import { getCart } from "@/stores/cart-store";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Metadata } from "next";


const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),

  title: "Glambeads",
  description:
    "Elevate your style with our exquisite handmade jewellery, crafted with the finest attention to detail.",
  generator: "Next.js",
  verification: {
    google: "hgCDy2IUmS0xFdUuXniziUzwvt0Ump4hBCDjw8Ed2MQ",
  },
  referrer: "origin",
  robots: "index, follow",
  keywords: "jewellery, handmade, accessories, fashion, style",
  category: "Fashion",
  openGraph: {

    type: "website",
    locale: "en_GB",
    url: defaultUrl,
    siteName: "Glambeads",
    title: "Glambeads",
    description:
      "Elevate your style with our exquisite handmade jewellery, crafted with the finest attention to detail.",
    images: [
      {
        url: "https://uijjfslwyuylxchlehlc.supabase.co/storage/v1/object/public/images/glambeads-new-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Glambeads",
      },
    ],
  },

  twitter: {
   card: "summary_large_image",
    site: "@site",
    title: "Glambeads",
    description:
      "Elevate your style with our exquisite handmade jewellery, crafted with the finest attention to detail.",
      images : "https://uijjfslwyuylxchlehlc.supabase.co/storage/v1/object/public/images/glambeads-new-logo.jpg"
  },
  icons: [
    {
      url: "https://uijjfslwyuylxchlehlc.supabase.co/storage/v1/object/public/images/glambeads-new-logo.jpg",
      type: "image/jpg",
      sizes: "16x16",
    },
  ],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cart = await getCart();

	return (
    <html lang="en" className={GeistSans.className}>
      <body className="">
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
