"use client";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createMaterialAction } from "@/utils/actions/materials";
import { PlusIcon } from "lucide-react";
import { useActionState, useState } from "react";

const CreateMaterial = () => {

  const [materialState, materialAction] = useActionState(
			createMaterialAction,
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
            <CardTitle>Create Material</CardTitle>
          </CardHeader>
					<form action={materialAction} className="flex flex-row gap-x-3">
						<Input name="name" placeholder="Material Name" required />
						<Button type="submit" className="flex items-center gap-x-2">
							{" "}
							Create
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		);
};
export default CreateMaterial;
