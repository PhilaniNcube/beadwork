/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ddilRxGq5wi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from "next/image";
import Link from "next/link";

export default function HomepageHero() {
	return (
		<section className="w-full py-12">
			<div className="container grid gap-6 px-0 lg:grid-cols-[1fr_550px] xl:grid-cols-[1fr_650px]">
				<Image
					src="https://utfs.io/f/04faf191-1499-45ca-95b6-ffdf52bed123-1jqe8d.jpg"
					width="854"
					height="1280"
					alt="Handmade Jewelry"
					className="object-cover mx-auto max-h-[500px] overflow-hidden aspect-square rounded-xl"
				/>
				<div className="flex flex-col justify-center space-y-4">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
							Discover Our Handcrafted jewellery Collection
						</h1>
						<p className="max-w-[600px] text-muted-foreground md:text-xl">
							Elevate your style with our exquisite handmade jewellery, crafted
							with the finest attention to detail.
						</p>
					</div>
					<Link
						href="/shop"
						className="inline-flex items-center justify-center h-10 max-w-sm px-8 text-sm font-medium transition-colors rounded-md shadow bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
						prefetch={false}
					>
						Shop the Collection
					</Link>
				</div>
			</div>
		</section>
	);
}
