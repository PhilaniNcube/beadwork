import { Button } from "@/components/ui/button";
import { getCategories, getCategoryById } from "@/utils/queries/categories";
import { ArrowLeft, SkipBack } from "lucide-react";
import Link from "next/link";
import UpdateCategory from "../_components/update-category";

const page = async (props: { params: Promise<{ id: number }> }) => {
  const params = await props.params;

  const {
    id
  } = params;

  console.log(id);

  const categoryData = getCategoryById(id);
  const categoriesData = getCategories();

  const [categoryResult, categoriesResult] = await Promise.all([
    categoryData,
    categoriesData,
  ]);

  if (categoryResult.error || categoriesResult.error) {
    return { error: "Error fetching data", status: 400 };
  }



  const category = categoryResult.data;
  const categories = categoriesResult.data;

  if(!category || !categories){
    return (
      <div>
        <Link href="/dashboard/categories">
          <Button>
            <ArrowLeft className="mr-2" />
            <span>Back To Categories</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-medium my-2">Category Not Found</h1>
      </div>
    )

  }

  return (
    <div>
      <Link href="/dashboard/categories">
        <Button>
          <ArrowLeft className="mr-2" />
          <span>Back To Categories</span>
        </Button>
      </Link>
      <h1 className="text-2xl font-medium my-2">{category?.name}</h1>
      <UpdateCategory category={category} categories={categories} />
    </div>
  );
};
export default page;
