import { getCategories } from "@/utils/queries/categories";
import CategoriesTable from "./_components/categories-table";

const DashboardCategoriesPage = async () => {
  const {data:categories, error} = await getCategories();

  if (error || !categories) {
    return <div>Error: No categories</div>;
  }

  return (
    <div>
      <CategoriesTable data={categories} />
    </div>
  );
};
export default DashboardCategoriesPage;
