import {
  getProductsWithImages,
  getSearchProducts,
} from "@/utils/queries/products";
import ProductList from "./_components/product-list";
import Container from "@/components/container";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import ProductSearchForm from "./_components/product-search-form";
import { Suspense } from "react";

const ShopPage = async (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  // get the search query from the searchParams
  const search = searchParams.q as string;

  const { error, products, count } = await getProductsWithImages(1, search);

  const searchResults = await getSearchProducts(search);

  console.log(searchResults);

  return (
    <div>
      <Container>
        <h1 className="mt-8 text-3xl font-bold text-slate-900">Shop</h1>
        {/* Count the number of products */}
        <p className="text-sm text-gray-500">
          {count} {count === 1 ? "Product" : "Products"}
        </p>
        <ProductSearchForm />
      </Container>
      <Suspense fallback={<Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="w-full aspect-square bg-slate-300 animate-pulse" />
          <div className="w-full aspect-square bg-slate-300 animate-pulse" />
          <div className="w-full aspect-square bg-slate-300 animate-pulse" />
          <div className="w-full aspect-square bg-slate-300 animate-pulse" />
        </div>
        Loading...
        </Container>}>
        <ProductList products={searchResults} />
      </Suspense>
    </div>
  );
};
export default ShopPage;
