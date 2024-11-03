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
import { format } from "date-fns";
import { deleteProductAction } from "@/utils/actions/products";
import { Alert } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import DeleteDialog from "./delete-dialog";
import { cn } from "@/lib/utils";

type Props = {
  products: Database["public"]["Tables"]["products"]["Row"][];
  count: number;
  sizes: Database["public"]["Tables"]["sizes"]["Row"][] | undefined;
};

export default function ProductsTable({ products, count, sizes }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="mb-2">
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
                <TableCell className="font-medium">
                  <p>{product.title}</p>
                  {/* filter the sizes and return the sizes for this product if they are available */}
                  {sizes !== undefined && (
                    <div className="flex flex-row gap-x-2">
                      {sizes
                        .filter((size) => size.product_id === product.id)
                        .map((size) => (
                          <Badge
                            className={cn(
                              "text-xs",
                              size.name === "Small" && "bg-blue-200",
                              size.name === "Medium" && "bg-zinc-200",
                              size.name === "Large" && "bg-violet-400",
                            )}
                            key={size.id}
                            variant="outline"
                          >
                            {size.name}
                          </Badge>
                        ))}
                    </div>
                  )}
                </TableCell>
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
                  {format(new Date(product.created_at), "dd/MM/yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center gap-x-3">
                    <Link href={`/dashboard/products/${product.id}`}>
                      <Button variant="ghost">Edit</Button>
                    </Link>
                    <DeleteDialog productId={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          <strong>{count}</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
