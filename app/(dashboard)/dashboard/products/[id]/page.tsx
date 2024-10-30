import {
  getCategories,
  getProductCategoriesByProductId,
} from "@/utils/queries/categories";
import {
  getMaterials,
  getProductMaterialsByProductId,
} from "@/utils/queries/materials";
import { getProductByID, getProductImages } from "@/utils/queries/products";
import { UploadButton } from "@/utils/uploadthing";
import EditProduct from "./_components/edit-product-form";
import ImageUpload from "./_components/image-upload";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditProductCategories from "./_components/edit-product-categories";
import EditProductMaterials from "./_components/edit-product-materials";
import ProductImageUploader from "@/components/product-image-uploader";
import DeleteProductImage from "./_components/delete-product-image";
import SizeOptionForm from "./_components/size-option-form";
import { useState } from "react";
import { getProductSizes } from "@/utils/queries/sizes";

interface Size {
  name: string;
  description?: string;
  dimensions?: string;
}

const DashboardProducts = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const categoryData = getCategories();
  const materialsData = getMaterials();
  const productData = getProductByID(id);
  const imageData = getProductImages(id);
  const productCategoriesData = getProductCategoriesByProductId(id);
  const productMaterialsData = getProductMaterialsByProductId(id);
  const productSizeData = getProductSizes(id);

  const [
    categoriesResult,
    materialsResult,
    productResult,
    productImages,
    productCategories,
    productMaterials,
    sizes,
  ] = await Promise.all([
    categoryData,
    materialsData,
    productData,
    imageData,
    productCategoriesData,
    productMaterialsData,
    productSizeData,
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
          <div className="flex w-full gap-x-4">
            <div className="w-full">
              <EditProduct product={productResult} />
              <div className="mt-4">
                <SizeOptionForm productId={productResult.id} />
              </div>
            </div>

            <div className="max-w-xl">
              <ProductImageUploader productId={productResult.id} />
              <div className="grid grid-cols-5 gap-2 mt-2">
                {productImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <DeleteProductImage imageId={image.id} />
                    <img
                      src={image.image_url}
                      alt="Image"
                      className="object-cover w-full aspect-square"
                    />
                  </div>
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
              <div className="mt-4">
                <h3 className="font-semibold text-md">Current Sizes:</h3>
                <ul className="flex flex-row flex-wrap gap-3">
                  {sizes.map((size, index) => (
                    <li key={index} className="p-3 border rounded bg-zinc-100 w-fit border-slate-600">
                      <p className="font-medium text-md">{size.name}</p>{" "}
                      <p className="text-xs text-muted-foreground">
                        ({size.dimensions})
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
export default DashboardProducts;
