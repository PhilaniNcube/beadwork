import Container from "@/components/container";
import { getCategoryBySlug } from "@/utils/queries/categories";
import { getProductsByCategoryId } from "@/utils/queries/products";
import CategoryProduct from "./_components/category-product";

const CategoryPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
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
              <img
                className="hidden object-cover w-full sm:block h-80"
                src={category.data.image_url!}
                alt="sofa"
              />
              <img
                className="object-cover w-full h-64 sm:hidden"
                src={category.data.image_url!}
                alt="sofa"
              />
              <div className="absolute flex items-start justify-start pr-10 sm:bottom-8 bottom-4 sm:pr-0 left-4 sm:left-8">
                <p className="text-3xl font-semibold leading-9 text-white sm:text-4xl">
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
          <div className="flex items-end justify-end mt-12">
            <div className="flex flex-row items-center justify-center space-x-8">
              <button className="text-base leading-none text-gray-800 border-b-2 border-transparent focus:outline-none focus:border-gray-800">
                <p>1</p>
              </button>
              <button className="text-base leading-none text-gray-800 border-b-2 border-transparent focus:outline-none focus:border-gray-800">
                <p>2</p>
              </button>
              <button className="text-base leading-none text-gray-800 border-b-2 border-transparent focus:outline-none focus:border-gray-800">
                <p>3</p>
              </button>
              <button className="flex items-center justify-center">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="#1F2937"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default CategoryPage;
