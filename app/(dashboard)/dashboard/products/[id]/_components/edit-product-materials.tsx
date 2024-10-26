"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Database } from "@/supabase";
import { Check, XIcon } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { useFormState } from "react-dom";
import { updateProductMaterialAction } from "@/utils/actions/materials";
import CreateMaterial from "../../_components/create-material";

type Props = {
	productId: number;
	materials: Database["public"]["Tables"]["materials"]["Row"][];
	productMaterials: Database["public"]["Tables"]["product_materials"]["Row"][];
};

type Material = {
	id: number;
	name: string;
};

type ProductMaterial = {
	material_id: number;
	product_id: number;
};

const EditProductMaterials = ({
	productId,
	materials,
	productMaterials,
}: Props) => {
	const [state, formAction] = useFormState(updateProductMaterialAction, null);
	const [pending, startTransition] = useTransition();

	const [optimisticProductMaterialsState, addOptimistic] = useOptimistic(
		productMaterials,
		(materialsState: ProductMaterial[], material: Material) => {
			const isMaterialSelected = materialsState.some(
				(productMaterial) => productMaterial.material_id === material.id,
			);
			if (isMaterialSelected) {
				return materialsState.filter(
					(productMaterial) => productMaterial.material_id !== material.id,
				);
			}
			return [
				...materialsState,
				{ material_id: material.id, product_id: productId },
			];
		},
	);

	return (
		<Card className="mt-3">
			<CardHeader>
				<div className="flex flex-row items-center justify-between">
					<CardTitle>Materials</CardTitle>
					<CreateMaterial />
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-4">
					{materials.map((material) => {
						const isMaterialSelected = optimisticProductMaterialsState.some(
							(productMaterial) => productMaterial.material_id === material.id,
						);
						return (
							<div key={material.id} className="flex flex-wrap items-center gap-2">
								<Badge
									onClick={() => {
										const formData = new FormData();
										formData.append("product_id", productId.toString());
										formData.append("material_id", material.id.toString());
										startTransition(() => {
											formAction(formData);
											addOptimistic(material);
										});
									}}
									className={cn(
										"py-1 px-2 rounded-full w-fit hover:bg-primary/80",
										isMaterialSelected
											? "bg-green-700 text-white"
											: "bg-muted text-primary",
									)}
								>
									{material.name}
									{isMaterialSelected ? (
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
export default EditProductMaterials;
