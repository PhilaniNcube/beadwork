import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import { getCart } from "@/stores/cart-store";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";


const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Beadworks",
	description:
		"Elevate your style with our exquisite handmade jewellery, crafted with the finest attention to detail.",
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
