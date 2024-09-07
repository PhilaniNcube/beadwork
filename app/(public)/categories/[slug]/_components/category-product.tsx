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
    <Link
      href={`/products/${product.slug}`}
      className="relative w-full cursor-pointer isolate group"
      prefetch={false}
    >
      <div className="relative flex items-center justify-center transition duration-500 group-hover:bg-opacity-60 bg-gray-50">
        <img
          className="transition duration-500 group-hover:opacity-60"
          src={images[0].image_url}
          alt={product.title}
        />
        <div className="inset-0 items-end hidden w-full px-3 py-2 transition-all duration-200 group-hover:flex group-hover:absolute">
          <Link
            href={`/products/${product.slug}`}
            className="w-full"
            prefetch={false}
          >
            <Button className="w-full mt-2 rounded-none">View Product</Button>
          </Link>
        </div>
      </div>
      <div className="py-2">
        <p className="font-normal leading-5 text-gray-600 transition duration-500 text-md line-clamp-1 group-hover:opacity-60">
          {product.title}
        </p>
        <p className="mt-2 text-lg font-semibold leading-5 text-gray-800 line-clamp-1">
          {formatCurrency(product.price!)}
        </p>
      </div>
      {/* <div>

      </div> */}
    </Link>
  );
};
export default CategoryProduct;
