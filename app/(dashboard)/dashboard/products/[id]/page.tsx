import { getCategories, getProductCategoriesByProductId } from "@/utils/queries/categories";
import { getMaterials, getProductMaterialsByProductId } from "@/utils/queries/materials";
import { getProductByID, getProductImages } from "@/utils/queries/products";
import { UploadButton } from "@/utils/uploadthing";
import EditProduct from "./_components/edit-product-form";
import ImageUpload from "./_components/image-upload";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditProductCategories from "./_components/edit-product-categories";
import EditProductMaterials from "./_components/edit-product-materials";
import ProductImageUploader from "@/components/product-image-uploader";

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
          <div className="flex gap-x-4 ">
            <EditProduct product={productResult} />
            <div className="max-w-xl">
              <ProductImageUploader productId={productResult.id}  />
              <div className="grid grid-cols-5 gap-2 mt-2">
                {productImages.map((image) => (
                  <img
                    key={image.id}
                    src={image.image_url}
                    alt="Image"
                    className="object-cover w-full aspect-square"
                  />
                ))}
              </div>

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
