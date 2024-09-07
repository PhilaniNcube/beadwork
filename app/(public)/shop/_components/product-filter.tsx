"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Database } from "@/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useOptimistic, useTransition } from "react";

const ProductFilter = ({
  materials,
  categories,
}: {
  materials: Database["public"]["Tables"]["materials"]["Row"][];
  categories: Database["public"]["Tables"]["categories"]["Row"][];
}) => {

const categorySlugs = categories.map((category) => category.slug);

const searchParams = useSearchParams();

const selectedCategories = searchParams.getAll("category");

let router = useRouter();
let [optimisticCategories, setOptimsticCategories] =
  useOptimistic(selectedCategories);
let [pending, startTransition] = useTransition();

 function updateCategories(categories: string[]) {
   let newParams = new URLSearchParams(
     categorySlugs.map((category) => ["category", category])
   );

   startTransition(() => {
     setOptimsticCategories(categories);
     router.push(`?${newParams}`);
   });
 }


  return (
    <div className="hidden lg:flex flex-col min-w-[200px] pr-10 space-y-6 mr-5">
      <div className="flex flex-col">
        <h3 className="mb-2 font-semibold">Categories</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={category.slug}
                checked={optimisticCategories.includes(category.slug)}
                onChange={(e) => {
                  let { name, checked } = e.target;
                  console.log(name, checked);
                  let newCategories = checked
                    ? [...optimisticCategories, name]
                    : optimisticCategories.filter((g) => g !== name);

                  updateCategories(newCategories);
                }}
                className="form-checkbox"
              />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-2 font-semibold">Materials</h3>
        <div className="space-y-1">
          {materials.map((material) => (
            <label key={material.id} className="flex items-center space-x-2">
              <Checkbox className="form-checkbox" />
              <span>{material.name}</span>
            </label>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-2 font-semibold">In Stock Only</h3>
        <Switch />
      </div>
    </div>
  );
};
export default ProductFilter;
