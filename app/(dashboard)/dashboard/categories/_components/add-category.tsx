"use client";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  addCategoryAction,
  createCategoryAction,
} from "@/utils/actions/categories";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { useFormState } from "react-dom";

const AddCategory = ({
  categories,
}: {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
}) => {
  const [categoryState, categoryAction] = useFormState(addCategoryAction, null);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" type="button">
          {" "}
          <PlusIcon />
          New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
        </CardHeader>
        <form action={categoryAction} className="flex-col gap-y-3">
          <Input
            name="name"
            placeholder="Category Name"
            required
            className="mb-1"
          />
          <Select name="parent_category_id">
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

          <SubmitButton
            type="submit"
            className="flex items-center w-full mt-2 rounded-none gap-x-2"
          >
            Create
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddCategory;