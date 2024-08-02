"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createCategoryAction } from "@/utils/actions/categories";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";

const CreateCategory = () => {

const [categoryState, categoryAction] = useFormState(
	createCategoryAction,
	null,
);
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
					<form action={categoryAction} className="flex flex-row gap-x-3">
						<Input name="name" placeholder="Category Name" required />
						<Button type="submit" className="flex items-center gap-x-2">
							{" "}
							Create
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		);
};
export default CreateCategory;
