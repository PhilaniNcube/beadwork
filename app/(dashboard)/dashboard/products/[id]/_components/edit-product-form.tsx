"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { editProductSchema, productSchema } from "@/schema";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import type { Database } from "@/supabase";

import { SubmitButton } from "@/components/submit-button";
import {
	createProductAction,
	editProductAction,
} from "@/utils/actions/products";
import { Separator } from "@/components/ui/separator";
import { startTransition, useActionState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Circle, CircleDashed } from "lucide-react";
import CreateCategory from "../../_components/create-category";
import CreateMaterial from "../../_components/create-material";


type Props = {
	product: Database["public"]["Tables"]["products"]["Row"];
};

export default function EditProduct({ product }: Props) {
	const form = useForm<z.infer<typeof editProductSchema>>({
		resolver: zodResolver(editProductSchema),
		defaultValues: {
			title: product.title,
			description: product.description,
			price: product.price,
			stock: product.stock,
			is_featured: product.is_featured,
		},
		mode: "onBlur",
	});

	const [state, formAction] = useActionState(editProductAction, null);




	return (
		<Card className="flex-1 w-full">
			<CardHeader>
				<CardTitle>Edit Product</CardTitle>
				<CardDescription>
					Fill out the form to edit the product details.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						action={(formData: FormData) => {
							startTransition(() => {
								formData.append("id", product.id.toString());
								 formAction(formData);
							});
						}}
						className="grid gap-6"
					>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product Title</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>
										<FormDescription>
											This is your product title displayed on your store.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Provide a product description here"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											This is your product description displayed on your store.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid gap-2 sm:grid-cols-2">
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Price</FormLabel>
											<FormControl>
												<Input placeholder="" type="number" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="stock"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Stock On Hand</FormLabel>
											<FormControl>
												<Input placeholder="" type="number" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid col-span-2 gap-2">
								<FormField
									control={form.control}
									name="is_featured"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between col-span-2 p-4 border rounded-lg">
											<div className="space-y-0.5">
												<FormLabel className="text-base">Featured</FormLabel>
												<FormDescription>
													Is this a featured product?
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													name="is_featured"
													checked={field.value}
													onCheckedChange={field.onChange}
													aria-readonly
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="grid gap-2">
							<SubmitButton className="max-w-sm" type="submit">
								Save Product
							</SubmitButton>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
