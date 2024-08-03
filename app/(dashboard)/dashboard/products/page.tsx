import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProductsTable from "./_components/products-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/utils/queries/products";

const Props = {
  searchParams: {
    page: "string",
    limit: "string"
  }
}

const DashboardProductsPage = async({searchParams: {page = "1", limit = "10"}}: {searchParams: {page: string, limit: string}}) => {

  const pageValue= Number(page);
  const limitValue = Number(limit);

  const products = await getProducts(pageValue, limitValue);

  return (
			<div className="">
				<Card>
					<CardHeader className="relative isolate">
						<CardTitle>Products</CardTitle>
						<CardDescription>
							Manage your products and view their sales performance.
						</CardDescription>
						<Link
							href="/dashboard/products/create"
							className="absolute top-1 right-2"
						>
							<Button>
								{" "}
								<PlusIcon className="mr-2" /> Create Product
							</Button>
						</Link>
					</CardHeader>
				</Card>
				<ScrollArea className="h-[500px] mt-3">
					<ProductsTable products={products} />
				</ScrollArea>
			</div>
		);
};
export default DashboardProductsPage;
