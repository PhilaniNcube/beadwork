"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Database } from "@/supabase";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";

type Props = {
  products: Database['public']['Tables']['products']['Row'][];
}

export default function ProductsTable({ products }:Props) {
	return (
		<Card>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>

							<TableHead>Name</TableHead>
							<TableHead>Stock</TableHead>
							<TableHead className="hidden md:table-cell">Price</TableHead>
							<TableHead className="hidden md:table-cell">
								Total Sales
							</TableHead>
							<TableHead className="hidden md:table-cell">Created at</TableHead>
							<TableHead>
								<span className="sr-only">Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>

								<TableCell className="font-medium">{product.title}</TableCell>
								<TableCell>
									<Badge variant="outline">{product.stock}</Badge>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{formatCurrency(product.price)}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{product.is_featured ? (
										<Badge className="bg-green-700">Featured</Badge>
									) : (
										<Badge className="bg-slate-600">Not Featured</Badge>
									)}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									2023-07-12 10:42 AM
								</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup="true" size="icon" variant="ghost">
												<MoreHorizontal className="w-4 h-4" />
												<span className="sr-only">Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>
												<Link href={`/dashboard/products/${product.id}`}>Edit</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<div className="text-xs text-muted-foreground">
					Showing <strong>1-10</strong> of <strong>32</strong> products
				</div>
			</CardFooter>
		</Card>
	);
}
