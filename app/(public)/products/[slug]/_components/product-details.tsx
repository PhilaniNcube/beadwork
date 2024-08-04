"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductDetailsType } from "@/schema";
import { formatCurrency } from "@/utils/formatCurrency";
import { cn } from "@/lib/utils";

type Props = {
  product: ProductDetailsType;
}


export default function ProductDetails({product}: Props) {
	return (
		<div className="container px-0 py-12 mx-auto">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div className="grid gap-4">
					<Carousel className="relative overflow-hidden rounded-lg aspect-square">
						<CarouselContent>
							{product.product_images.map((image) => (
								<CarouselItem key={image.id}>
									<img
										src={image.image_url}
										alt="Product"
										width={800}
										height={600}
										className="object-cover w-full h-full aspect-square"
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
					<div className="grid grid-cols-5 gap-2">
						{product.product_images.map((image) => (
							<div
								key={image.id}
								className="col-span-1 overflow-hidden border rounded-lg"
							>
								<img
									src={image.image_url}
									alt={product.title}
									width={200}
									height={200}
									className="object-cover w-full h-full aspect-square"
									style={{ aspectRatio: "100/100", objectFit: "cover" }}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="">
					<div className="">
						<h1 className="text-3xl font-bold">{product.title}</h1>
						<div className="flex flex-col items-start gap-2">
							<div className="flex items-center gap-2 mt-4 mb-4">
								{/* <h2 className="text-sm font-medium">Category:</h2>
								{product.product_categories.length > 0 && product.product_categories.map((category) => (
									<Badge
										key={category.id}
										variant="outline"
										className="bg-muted text-md"
									>
										{category.name}
									</Badge>
								))} */}
							</div>
							<div className="flex items-center gap-2">
								{/* <h2 className="text-sm font-medium">Material:</h2> */}
								{/* {product.product_materials.map((material) => (
									<Badge
										key={material.name}
										variant="outline"
										className="bg-muted"
									>
										{material.name}
									</Badge>
								))} */}
							</div>
						</div>
					</div>
					<p className="mb-3 text-muted-foreground">{product.description}</p>
					<div className="mb-3 text-2xl font-bold">
						{formatCurrency(product.price)}
					</div>
					<div className="flex items-center gap-2 mb-3">
						<h2 className="text-sm font-medium">Stock:</h2>
						<Badge
							variant="outline"
							className={cn(
								"",
								product.stock === 0 ? "bg-red-700 text-white" : "bg-muted",
							)}
						>
							{product.stock} in stock
						</Badge>
					</div>
					<Button size="lg">Add to Cart</Button>
				</div>
			</div>
		</div>
	);
}
