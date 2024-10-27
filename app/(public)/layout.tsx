import { CartStoreProvider } from "@/stores/cart-provider";
import Footer from "./_components/footer";
import PublicHeader from "./_components/public-header";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Beadworks",
	description:
		"Elevate your style with our exquisite handmade jewellery, crafted with the finest attention to detail.",
};

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="grid grid-rows-[auto_1fr_auto] min-h-[100dvh]">
			<CartStoreProvider>
        <Suspense fallback={<div className="flex items-center">
          <Skeleton className="w-24 h-10 animate-pulse" />
        </div>}>
				  <PublicHeader />
        </Suspense>
				<main className="">{children}</main>
				<Footer />
			</CartStoreProvider>
		</div>
	);
}
