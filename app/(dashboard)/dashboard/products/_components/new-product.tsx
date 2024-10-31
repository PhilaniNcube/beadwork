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
import { productSchema } from "@/schema";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import type { Database } from "@/supabase";
import CreateCategory from "./create-category";
import CreateMaterial from "./create-material";
import { SubmitButton } from "@/components/submit-button";
import { createProductAction } from "@/utils/actions/products";
import { Separator } from "@/components/ui/separator";
import { useActionState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Circle, CircleDashed } from "lucide-react";

type Props = {
	categories: Database["public"]["Tables"]["categories"]["Row"][];
	materials: Database["public"]["Tables"]["materials"]["Row"][];
};

export default function CreateProduct({ categories, materials }: Props) {
	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			stock: 0,
			categories: [],
			materials: [],
		},
		mode: "onBlur",
	});

	const [state, formAction] = useActionState(createProductAction, null);
  const [pending, startTransition] = useTransition();

	const handleSubmit = (data: z.infer<typeof productSchema>) => {
		// console.log(data);
		const formData = new FormData();

		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("stock", data.stock.toString());
		formData.append("price", data.price.toString());
		if (data.is_featured) {
			formData.append("is_featured", "on");
		}
		for (const item of data.categories) {
			formData.append("categories", item.toString());
		}

		for (const item of data.materials) {
			formData.append("materials", item.toString());
		}
    startTransition(() => {
      formAction(formData);
    });
	};

	return (
		<Card className="w-full max-w-4xl">
			<CardHeader>
				<CardTitle>Create a New Product</CardTitle>
				<CardDescription>
					Fill out the form to add a new product to your store.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
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
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="is_featured"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
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
							<div className="grid md:grid-cols-2 gap-x-8">
								<FormField
									control={form.control}
									name="categories"
									render={() => (
										<FormItem>
											<div className="flex justify-between mb-4">
												<div>
													<FormLabel className="text-base">
														Product Categories
													</FormLabel>
													<FormDescription>
														Select relevant categories for your product.
													</FormDescription>
												</div>{" "}
												<CreateCategory />
											</div>
											<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
												{categories.map((item) => (
													<FormField
														key={item.id}
														control={form.control}
														name="categories"
														render={({ field }) => {
															return (
																<FormItem
																	key={item.id}
																	className="flex flex-row items-start space-x-3 space-y-0"
																>
																	<FormControl>
																		<Checkbox
																			name="categories"
																			checked={field.value?.includes(item.id)}
																			onCheckedChange={(checked) => {
																				return checked
																					? field.onChange([
																							...field.value,
																							item.id,
																						])
																					: field.onChange(
																							field.value?.filter(
																								(value) => value !== item.id,
																							),
																						);
																			}}
																		/>
																	</FormControl>
																	<FormLabel className="font-normal">
																		{item.name}
																	</FormLabel>
																</FormItem>
															);
														}}
													/>
												))}
											</div>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="materials"
									render={() => (
										<FormItem>
											<div className="flex flex-row justify-between mb-4">
												<div>
													<FormLabel className="text-base">
														Product Materials
													</FormLabel>
													<FormDescription>
														Select relevant materials in your product.
													</FormDescription>
												</div>
												<CreateMaterial />
											</div>

											<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
												{materials.map((item) => {
													return (
														<FormField
															key={item.id}
															control={form.control}
															name="materials"
															render={({ field }) => {
																return (
																	<FormItem
																		key={item.id}
																		className="flex flex-row items-start space-x-3 space-y-0"
																	>
																		<FormControl>
																			<Checkbox
																				checked={field.value?.includes(item.id)}
																				name="materials"
																				onCheckedChange={(checked) => {
																					return checked
																						? field.onChange([
																								...field.value,
																								item.id,
																							])
																						: field.onChange(
																								field.value?.filter(
																									(value) => value !== item.id,
																								),
																							);
																				}}
																			/>
																		</FormControl>
																		<FormLabel className="font-normal">
																			{item.name}
																		</FormLabel>
																	</FormItem>
																);
															}}
														/>
													);
												})}
											</div>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<Separator className="my-3" />
						<div className="grid gap-2">
							<Button disabled={pending} aria-disabled={pending}  className="max-w-sm" type="submit">
								{pending ? <CircleDashed className="animate-spin" /> : "Create Product"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
