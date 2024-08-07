"use client";

import Container from "@/components/container";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import MobileSlide from "./mobile-slide";
import { ArrowLeft, ShoppingBasket, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-provider";

const MobilePublicHeader = ({ user }: { user: User | null }) => {

 const { products: cartItems, addToCart } = useCartStore((state) => state);



	return (
		<div className="flex md:hidden">
			<Container>
				<div className="flex items-center justify-between">
					<Link href="/">Home</Link>
					<div className="flex items-center gap-x-3">
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
									<small
										className={cn(
											"absolute top-0 right-0 -mt-2 -mr-2 px-1 text-xs text-white bg-red-500 rounded-full",
										)}
									>
										{cartItems.length}
									</small>
									<ShoppingBasket size={24} />
								</Link>
							</div>
						) : (
							<div className="flex items-center gap-x-4">
								<Link href="/login">Log In</Link>
								<Link href="/sign-up">Sign up</Link>
								<Link href="/cart" className="relative isolate">
									<small
										className={cn(
											"absolute top-0 right-0 -mt-2 -mr-2 px-1 text-xs text-white bg-red-500 rounded-full",
										)}
									>
										{cartItems.length}
									</small>
									<ShoppingBasket size={24} />
								</Link>
							</div>
						)}
						<MobileSlide />
					</div>
				</div>
			</Container>
		</div>
	);
};
export default MobilePublicHeader;
