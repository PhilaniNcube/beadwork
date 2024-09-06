import Container from "@/components/container";
import { getCategoryBySlug } from "@/utils/queries/categories";

const CategoryPage = async ({params:{slug}}:{params:{slug:string}}) => {

  const category = await getCategoryBySlug(slug);

  return <Container>{category.data?.name}</Container>;
};
export default CategoryPage;
