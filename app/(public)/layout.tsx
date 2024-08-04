import Footer from "./_components/footer";
import PublicHeader from "./_components/public-header";

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
			<PublicHeader />
			<main className="">{children}</main>
			<Footer />
		</div>
	);
}
