import { getCategories, getProductCategoriesByProductId } from "@/utils/queries/categories";
import { getMaterials, getProductMaterialsByProductId } from "@/utils/queries/materials";
import { getProductByID, getProductImages } from "@/utils/queries/products";
import { UploadButton } from "@/utils/uploadthing";
import EditProduct from "./_components/edit-product-form";
import ImageUpload from "./_components/image-upload";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditProductCategories from "./_components/edit-product-categories";
import EditProductMaterials from "./_components/edit-product-materials";

const DashboardProducts = async ({
	params: { id },
}: { params: { id: number } }) => {
	const categoryData = getCategories();
	const materialsData = getMaterials();
	const productData = getProductByID(id);
  const imageData = getProductImages(id);
  const productCategoriesData =  getProductCategoriesByProductId(id);
  const productMaterialsData =  getProductMaterialsByProductId(id);



	const [categoriesResult, materialsResult, productResult, productImages,productCategories, productMaterials] =
		await Promise.all([
			categoryData,
			materialsData,
			productData,
			imageData,
			productCategoriesData,
			productMaterialsData,
		]);

	const {
		data: categories,
		error: categoryError,
		status: categoryStatus,
	} = categoriesResult;
	const {
		data: materials,
		error: materialError,
		status: materialStatus,
	} = materialsResult;



	return (
		<div className="">
			{productResult && (
				<ScrollArea className="w-full gap-x-4 h-[650px]">
					<div className="flex gap-x-4">
						<EditProduct product={productResult} />
						<div>
							<ImageUpload
								productId={productResult.id}
								images={productImages}
							/>
							{categories && productCategories && (
								<EditProductCategories
									productId={productResult.id}
									categories={categories}
									productCategories={productCategories}
								/>
							)}
							{materials && productMaterials && (
								<EditProductMaterials
									productId={productResult.id}
									materials={materials}
									productMaterials={productMaterials}
								/>
							)}
						</div>
					</div>
				</ScrollArea>
			)}
		</div>
	);
};
export default DashboardProducts;
