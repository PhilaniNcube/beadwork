import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateProduct from "../_components/new-product";
import { getCategories } from "@/utils/queries/categories";
import { getMaterials } from "@/utils/queries/materials";

const NewProduct = async () => {

  const categoryData = getCategories();
  const materialsData = getMaterials();

  const [categoriesResult, materialsResult] = await Promise.all([categoryData, materialsData]);

  const { data: categories, error:categoryError, status:categoryStatus } = categoriesResult;
  const { data: materials, error:materialError, status:materialStatus } = materialsResult;





  return (
			<div className="flex gap-x-3">
        {categories && materials &&
				<CreateProduct categories={categories} materials={materials} />
        }
				<Card className="w-full max-w-[350px]">
					<CardHeader>
						<CardTitle>Product Images</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-row flex-wrap gap-3">
						<div className="w-[95px] rounded aspect-square bg-slate-300" />
						<div className="w-[95px] rounded aspect-square bg-slate-300" />
						<div className="w-[95px] rounded aspect-square bg-slate-300" />
					</CardContent>
				</Card>
			</div>
		);
};
export default NewProduct;
