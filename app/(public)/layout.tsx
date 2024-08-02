import PublicHeader from "./_components/public-header";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
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
			<footer>Footer</footer>
		</div>
	);
}
