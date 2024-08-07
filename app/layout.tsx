import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import { getCart } from "@/stores/cart-store";
import  { CartStoreProvider } from "@/stores/cart-provider";

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

					{children}
					<Toaster />

			</body>
		</html>
	);
}
