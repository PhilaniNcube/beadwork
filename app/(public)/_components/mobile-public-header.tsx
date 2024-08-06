"use client";

import Container from "@/components/container";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import MobileSlide from "./mobile-slide";
import { ArrowLeft, ShoppingBasket, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart-provider";

const MobilePublicHeader = ({ user }: { user: User | null }) => {

  const cartHook = useCart();
		const cart = cartHook ? cartHook((state) => state.cart) : null;

		// get the cart count
		const cartCount = cart
			? cart.products.reduce((acc, product) => acc + product.quantity, 0)
			: 0;

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
										<small className="absolute flex items-center justify-center w-6 h-6 text-sm text-red-500 rounded-full -right-3 -top-2">
											{cartCount}
										</small>
										<ShoppingBasket size={24} />
									</Link>
								</div>
							) : (
								<div className="flex items-center gap-x-4">
									<Link href="/login">Log In</Link>
									<Link href="/sign-up">Sign up</Link>
									<Link href="/cart" className="relative isolate">
										<small className="absolute flex items-center justify-center w-6 h-6 text-sm text-red-500 rounded-full -right-3 -top-2">
											{cartCount}
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
