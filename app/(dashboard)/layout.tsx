import Link from "next/link";
import {
	Bell,
	BlocksIcon,
	CircleUser,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	Search,
	ShoppingCart,
	Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


export default function Dashboard({children}:{children:ReactNode}) {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex flex-col h-full max-h-screen gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/" className="flex items-center gap-2 font-semibold">
							<Package2 className="w-6 h-6" />
							<span className="">Beadworks</span>
						</Link>
						<Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
							<Bell className="w-4 h-4" />
							<span className="sr-only">Toggle notifications</span>
						</Button>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Link
								href="/dashboard"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<Home className="w-4 h-4" />
								Dashboard
							</Link>
							<Link
								href="/dashboard/orders"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<ShoppingCart className="w-4 h-4" />
								Orders
							</Link>
							<Link
								href="/dashboard/products"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<Package className="w-4 h-4" />
								Products{" "}
							</Link>
							<Link
								href="/dashboard/categories"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<BlocksIcon className="w-4 h-4" />
								Categories{" "}
							</Link>
							<Link
								href="/dashboard/customers"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<Users className="w-4 h-4" />
								Customers
							</Link>
							<Link
								href="/dashboard/analytics"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<LineChart className="w-4 h-4" />
								Analytics
							</Link>
						</nav>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="w-5 h-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<Link
									href="/"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<Package2 className="w-6 h-6" />
									<span className="sr-only">Beadworks</span>
								</Link>
								<Link
									href="/dashboard"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Home className="w-5 h-5" />
									Dashboard
								</Link>
								<Link
									href="/dashboard/orders"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<ShoppingCart className="w-5 h-5" />
									Orders
								</Link>
								<Link
									href="/dashboard/products"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Package className="w-5 h-5" />
									Products
								</Link>
								<Link
									href="/dashboard/categories"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<BlocksIcon className="w-5 h-5" />
									Categories
								</Link>
								<Link
									href="/dashboard/customers"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Users className="w-5 h-5" />
									Customers
								</Link>
								<Link
									href="/dashboard/analytics"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<LineChart className="w-5 h-5" />
									Analytics
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<div className="flex-1 w-full">
						<form>
							<div className="relative">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search products..."
									className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
								/>
							</div>
						</form>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="w-5 h-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
					{children}
				</main>
			</div>

		</div>
	);
}
