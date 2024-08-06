"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCart } from "@/stores/cart-provider";
import { cartCount } from "@/stores/cart-store";
import type { User } from "@supabase/supabase-js";
import { ArrowBigLeft, ArrowLeft, Search, ShoppingBagIcon, ShoppingBasket, UserIcon } from "lucide-react";
import Link from "next/link";

const DesktopPublicHeader = ({ user }: { user: User | null }) => {

  const cartHook = useCart();
  const cart = cartHook ? cartHook((state) => state.cart) : null;

  const total = cartHook ? cartHook((state) => state.totalItems) : 0;




	return (
		<div className="items-center hidden md:flex">
			<Container>
				<div className="flex items-center justify-between w-full">
					<div>
						<Link className="font-semibold" href="/">
							Home
						</Link>
					</div>
					<form className="flex-1 min-w-[200px] max-w-[600px] flex flex-row relative px-10">
						<Input
							placeholder="Search"
							type="search"
							className="h-8 rounded-full"
						/>
						<Button className="h-8" variant="ghost">
							<Search
								size={24}
								className="text-slate-800 -translate-x-[50px] border-l border-slate-700 pl-1"
							/>
						</Button>
					</form>
					<div className="flex items-center gap-x-3">
						<Link href="/shop" className="uppercase">
							Shop
						</Link>
						<Link href="/categories" className="uppercase">
							Categories
						</Link>
					</div>
					{user ? (
						<div className="flex items-center gap-x-4">
							<Link href="/account">
								<UserIcon size={24} />
							</Link>
							<form>
								<Button variant="destructive" size="sm" type="submit">
									<ArrowLeft size={24} />
								</Button>
							</form>
							<Link href="/cart" className="relative isolate">
								<ShoppingBasket size={24} />
							</Link>
						</div>
					) : (
						<div className="flex items-center gap-x-4">
							<Link href="/login">Log In</Link>
							<Link href="/sign-up">Sign up</Link>
							<Link href="/cart" className="relative isolate">
								<ShoppingBasket
									className={cn(
										cart?.products.length !==
											undefined && cart?.products?.length > 0
											? "text-red-600 fill-red-600"
											: "text-white",
									)}
									size={24}
								/>
							</Link>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};
export default DesktopPublicHeader;
