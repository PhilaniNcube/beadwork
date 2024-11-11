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

     const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.title,
        image: product.product_images[0],
        description: product.description,
        sku: product.id,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
          url: `https://www.glambeads.co.za/products/${slug}`,
        },
     }


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetails product={product} sizes={sizes} />
    </>
  );
};
export default Product;
