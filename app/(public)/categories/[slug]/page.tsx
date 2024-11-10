import Container from "@/components/container";
import { getCategoryBySlug } from "@/utils/queries/categories";
import { getProductsByCategoryId } from "@/utils/queries/products";
import CategoryProduct from "./_components/category-product";
import Image from "next/image";

const CategoryPage = async (
  props: {
    params: Promise<{ slug: string }>;
  }
) => {
  const params = await props.params;

  const {
    slug
  } = params;

  const category = await getCategoryBySlug(slug);

  if (!category.data) {
    return null;
  }

  const products = await getProductsByCategoryId(category.data.id);

  return (
    <Container>
      <div className="container px-6 py-12 mx-auto xl:px-0">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center">
            <div className="relative">
              <Image
                width={1920}
                height={1080}
                className="object-cover w-full h-80"
                src={category.data.image_url!}
                alt="sofa"
              />

              <div className="absolute flex items-start justify-start pr-10 sm:bottom-8 bottom-4 sm:pr-0 left-4 sm:left-8">
                <p className="text-3xl font-semibold leading-9 sm:text-4xl">
                  {category.data.name}
                </p>
              </div>
            </div>
          </div>
          <div className="grid items-center mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
            {products.map((product) => (
              <CategoryProduct key={product.id} product={product} />
            ))}
          </div>

        </div>
      </div>
    </Container>
  );
};
export default CategoryPage;
