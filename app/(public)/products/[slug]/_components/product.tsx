import { getProductDetails } from "@/utils/queries/products";
import ProductDetails from "./product-details";

const Product = async ({ slug }:{slug:string}) => {

     const { product, error } = await getProductDetails(slug);

     if (error || product === null) {
       return (
         <div className="container py-8">Could not retrieve product data</div>
       );
     }


  return <ProductDetails product={product} />;
};
export default Product;
