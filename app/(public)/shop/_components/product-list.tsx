import Container from "@/components/container";
import type { ProductListItemType } from "@/schema";
import ProductListItem from "./product-list-item";
import { getCategories } from "@/utils/queries/categories";
import { getMaterials } from "@/utils/queries/materials";
import ProductFilter from "./product-filter";

type Props = {
  products: ProductListItemType[];
};

const ProductList = async ({products}:Props) => {

  const categoriesData =  getCategories();
  const materialsData =  getMaterials();

  const [categories, materials] = await Promise.all([categoriesData, materialsData]);

  if (!products) {
    return null;
  }

  if (!categories || !materials || !categories.data || !materials.data) {
    return null;
  }


  return (
    <section className="mt-8">
      <Container>
        <div className="flex items-start">

          <div className="grid grid-cols-2 gap-6 px-0 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
export default ProductList;
