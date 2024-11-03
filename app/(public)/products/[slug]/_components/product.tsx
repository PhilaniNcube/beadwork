import { getProductDetails, getProductSizes } from "@/utils/queries/products";
import ProductDetails from "./product-details";

const Product = async ({ slug }:{slug:string}) => {

     const { product, error } = await getProductDetails(slug);

     if (error || product === null) {
       return (
         <div className="container py-8">Could not retrieve product data</div>
       );
     }

     const sizes = await getProductSizes(product.id);


  return <ProductDetails product={product} sizes={sizes} />;
};
export default Product;
