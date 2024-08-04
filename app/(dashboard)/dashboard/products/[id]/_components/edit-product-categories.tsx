"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Database } from "@/supabase";
import { updateProductCategoryAction } from "@/utils/actions/categories";
import { Check, XIcon } from "lucide-react";
import { useTransition } from "react";
import { useFormState } from "react-dom";
import CreateCategory from "../../_components/create-category";

type Props = {
	productId: number;
	categories: Database["public"]["Tables"]["categories"]["Row"][];
	productCategories: Database["public"]["Tables"]["product_categories"]["Row"][];
};

const EditProductCategories = ({
	productId,
	categories,
	productCategories,
}: Props) => {
	const [state, formAction] = useFormState(updateProductCategoryAction, null);
	const [pending, startTransition] = useTransition();

	return (
		<Card className="mt-3">
			<CardHeader>
        <div className="flex flex-row items-center justify-between">
				<CardTitle>Categories</CardTitle>
         <CreateCategory />
        </div>
			</CardHeader>
			<CardContent>
				<div className="flex gap-x-4">
					{categories.map((category) => {
						const isCategorySelected = productCategories.some(
							(productCategory) => productCategory.category_id === category.id,
						);
						return (
							<div key={category.id} className="flex items-center gap-x-2">
								<Badge
									onClick={() => {
										const formData = new FormData();
										formData.append("product_id", productId.toString());
										formData.append("category_id", category.id.toString());
                    startTransition(() => {
                      formAction(formData);
                    });
									}}
									className={cn(
										"p-1 rounded-full hover:bg-primary/80",
										isCategorySelected
											? "bg-green-700 text-white"
											: "bg-muted text-primary",

									)}
								>
									{category.name}
									{isCategorySelected ? (
										<XIcon className="w-4 h-4 ml-2" />
									) : (
										<Check className="w-4 h-4 ml-2" />
									)}
								</Badge>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};
export default EditProductCategories;
