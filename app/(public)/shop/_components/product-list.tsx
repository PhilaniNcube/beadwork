import Container from "@/components/container";
import type { ProductListItemType } from "@/schema";
import ProductListItem from "./product-list-item";

type Props = {
  products: ProductListItemType[];
}

const ProductList = ({products}:Props) => {
  return (
			<section className="mt-8">
				<Container>
          <div className="@container px-0 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => <ProductListItem key={product.id} product={product} />)}
          </div>
        </Container>
			</section>
		);
};
export default ProductList;
