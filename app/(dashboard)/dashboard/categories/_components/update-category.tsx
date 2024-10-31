"use client";

import CategoryImageUploader from "@/components/category-image-uploader";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/supabase";
import {
  updateCategoryAction,
} from "@/utils/actions/categories";
import { useActionState, useState } from "react";

const UpdateCategory = ({
  categories,
  category,
}: {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
  category: Database["public"]["Tables"]["categories"]["Row"];
}) => {
  const [categoryState, categoryAction] = useActionState(updateCategoryAction, null);
  const [open, setOpen] = useState(false);


  const [categoryUrl, setCategoryUrl] = useState<string>("");

  return (
    <Card className="max-w-5xl p-4">
      <CardHeader>
        <CardTitle>Update Category</CardTitle>
      </CardHeader>
      <form action={categoryAction} className="flex-col gap-y-3">
        <Input name="id" type="hidden" value={String(category.id)} />
        <Input
          name="name"
          placeholder="Category Name"
          required
          defaultValue={category.name}
          className="mb-1"
        />
        <Select
          defaultValue={String(category.parent_category_id)}
          name="parent_category_id"
        >
          <SelectTrigger className="w-full mt-3" name="parent_category_id">
            <SelectValue placeholder="Select a parent category" />
          </SelectTrigger>
          <SelectContent className="w-full mb-3">
            {categories.map((item) => (
              <SelectItem key={item.id} value={String(item.id)}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CategoryImageUploader setCategoryUrl={setCategoryUrl} />
        <Input
          name="image_url"
          placeholder="Category URL"
          required
          type="hidden"
          value={categoryUrl}
          className="mb-1"
        />
        {category.image_url && (
          <img
            src={category.image_url}
            alt={category.name}
            className="w-1/2 my-3"
          />
        )}

        <SubmitButton
          type="submit"
          className="flex items-center w-full mt-2 rounded-none gap-x-2"
        >
          Create
        </SubmitButton>
      </form>
    </Card>
  );
};
export default UpdateCategory;
