import { getCategories } from "@/utils/queries/categories";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CategoriesPage = async () => {

  const {error, status, data:categories} = await getCategories();

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Shop by Category</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories && categories.map((category, index) => (
          <Card key={index} className="overflow-hidden transition-colors hover:bg-accent">
            <img
              src={category?.image_url || ""}
              alt={category.name}
              className="object-cover w-full h-44"
            />
            <CardContent className="flex flex-col items-center p-6">

              <h2 className="mb-2 text-xl font-semibold text-center">
                {category.name}
              </h2>

              <Link
                href={`/categories/${category.slug}`}
                className="text-primary hover:underline"
              >
                <Button className="px-8 rounded-none">
                Shop Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CategoriesPage;
