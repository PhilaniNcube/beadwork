import { Button } from "@/components/ui/button";
import type { ProductListItemType } from "@/schema";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: ProductListItemType;
}

const ProductListItem = ({product}:Props) => {
  return (
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
		);
};
export default ProductListItem;
