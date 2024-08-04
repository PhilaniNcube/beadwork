import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import { getFeaturedProducts } from "@/utils/queries/products";
import Image from "next/image";
import Link from "next/link";

const FeaturedProducts = async () => {
	const products = await getFeaturedProducts();

	return (
		<section className="mt-8">
			<Container>
				<div className="@container px-0">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
						{products.map((product) => (
							<Link
								href={`/products/${product.slug}`}
								key={product.id}
								className="bg-white rounded-md shadow-md cursor-pointer"
							>
								<Image
									width={500}
									height={500}
									src={product.product_images[0].image_url}
									alt={product.title}
									className="object-cover w-full rounded-md aspect-square"
								/>
								<div className="p-3">
									<h3 className="mt-2 font-semibold text-slate-600 text-md line-clamp-1">
										{product.title}
									</h3>
									<h4 className="text-lg font-bold text-slate-950">
										{formatCurrency(product.price)}
									</h4>
									<Button className="w-full mt-2">View Product</Button>
								</div>
								{/* <p className="mt-1 text-sm text-gray-500">{product.description}</p> */}
							</Link>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
};
export default FeaturedProducts;
