import { getProductDetails } from "@/utils/queries/products";
import ProductDetails from "./_components/product-details";
import Product from "./_components/product";
import { Suspense } from "react";
import ProductDetailSkeleton from "./_components/product-detail-skeleton";

const ProductPage = async (
  props: {
    params: Promise<{ slug: string }>;
  }
) => {
  const params = await props.params;

  const {
    slug
  } = params;

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <Product slug={slug} />
    </Suspense>
  );
};
export default ProductPage;
