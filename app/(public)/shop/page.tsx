import { getProductsWithImages } from "@/utils/queries/products";
import ProductList from "./_components/product-list";

const ShopPage = async () => {

  const {error, products, count} = await getProductsWithImages();

  return <div>
    <div className="min-h-[200px] flex items-center justify-center bg-zinc-300">
     <h1 className="text-xl font-bold md:text-2xl lg:text-5xl">Shop</h1>
    </div>
    <ProductList products={products} />
  </div>;
};
export default ShopPage;
