"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {z} from 'zod';
import { productSchema } from "@/schema";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import type { Database } from "@/supabase";
import { createCategoryAction } from "@/utils/actions/categories";
import { useFormState } from "react-dom";
import { createMaterialAction } from "@/utils/actions/materials";
import { useState } from "react";
import CreateCategory from "./create-category";
import CreateMaterial from "./create-material";

type Props = {
	categories: Database["public"]["Tables"]["categories"]["Row"][];
	materials: Database["public"]["Tables"]["materials"]["Row"][];
};


export default function CreateProduct({categories, materials}:Props) {

const form = useForm<z.infer<typeof productSchema>>({
  resolver: zodResolver(productSchema),
  defaultValues: {
    stock: 0,
    categories: [],
  }
})






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
					<form className="grid gap-6">
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
												{materials.map((item) => (
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
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="tags">Tags</Label>
							<Input id="tags" placeholder="Enter tags separated by commas" />
						</div>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-end gap-2">
				<Button variant="outline">Cancel</Button>
				<Button>Create Product</Button>
			</CardFooter>
		</Card>
	);
}
