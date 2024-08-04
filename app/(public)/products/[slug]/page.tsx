import { getProductDetails } from "@/utils/queries/products";
import ProductDetails from "./_components/product-details";

const ProductPage = async  ({params:{slug}}:{params:{slug:string}}) => {

   const {product, error} = await getProductDetails(slug);

  return <div>{product !== null && <ProductDetails product={product} />}</div>;
};
export default ProductPage;
