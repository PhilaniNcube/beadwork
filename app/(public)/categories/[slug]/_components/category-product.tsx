import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import { getProductImages } from "@/utils/queries/products";
import Link from "next/link";
import { format } from "path";

const CategoryProduct = async ({
  product,
}: {
  product: {
    id: number | undefined;
    title: string | undefined;
    price: number | undefined;
    slug: string | undefined;
  };
}) => {
  const images = await getProductImages(product.id!);

  return (
    <div>
      <div className="relative flex items-center justify-center transition duration-500 group group-hover:bg-opacity-60 bg-gray-50">
        <img
          className="transition duration-500 group-hover:opacity-60"
          src={images[0].image_url}
          alt={product.title}
        />
        <div className="absolute flex flex-col items-start justify-start space-y-2 sm:top-8 top-4 left-4 sm:left-8"></div>
      </div>
      <div className="py-2">
        <p className="text-xl font-semibold leading-5 text-gray-600 transition duration-500 line-clamp-1 group-hover:opacity-60">
          {product.title}
        </p>
      </div>
      <div>
        <p className="mt-2 font-semibold leading-5 text-gray-800 transition duration-500 text-md group-hover:opacity-60 line-clamp-1">
          {formatCurrency(product.price!)}
        </p>
        <Link href={`/products/${product.slug}`}>
          <Button className="w-full mt-2 rounded-none">View Product</Button>
        </Link>
      </div>
    </div>
  );
};
export default CategoryProduct;
