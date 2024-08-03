import { getCategories } from "@/utils/queries/categories";
import { getMaterials } from "@/utils/queries/materials";
import { getProductByID, getProductImages } from "@/utils/queries/products";
import { UploadButton } from "@/utils/uploadthing";
import EditProduct from "./_components/edit-product-form";
import ImageUpload from "./_components/image-upload";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardProducts = async ({
	params: { id },
}: { params: { id: number } }) => {
	const categoryData = getCategories();
	const materialsData = getMaterials();
	const productData = getProductByID(id);
  const imageData = getProductImages(id);

	const [categoriesResult, materialsResult, productResult, productImages] =
		await Promise.all([categoryData, materialsData, productData, imageData]);

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
						<ImageUpload productId={productResult.id} images={productImages} />
					</div>
				</ScrollArea>
			)}
		</div>
	);
};
export default DashboardProducts;
