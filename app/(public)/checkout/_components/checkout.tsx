"use client";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-provider";
import { formatCurrency } from "@/utils/formatCurrency";
import type { User } from "@supabase/supabase-js";
import { SignUp } from "../../_components/sign-up";
import Link from "next/link";
import PayStackElements from "./paystack-element";

export default function Checkout({ user }: { user: User | null }) {
	const {
		products: cartItems,
		addToCart,
		removeFromCart,
		subtractFromCart,
	} = useCartStore((state) => state);

	const subtotal =
		cartItems.reduce((total, item) => total + item.price * item.quantity, 0) ||
		0;

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100dvh-150px)] bg-background">
			<div className="w-full max-w-6xl p-8 rounded-lg shadow-lg bg-card">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					<div>
						<h1 className="mb-4 text-2xl font-bold">Order Summary</h1>
						<div className="space-y-4">
							{cartItems.length > 0 ? (
								cartItems.map((item) => (
									<div
										key={item.id}
										className="flex items-center justify-between"
									>
										<div>
											<img
												src={item.product_images[0].image_url}
												alt={item.title}
												width={120}
												height={120}
												className="object-cover rounded-md aspect-square"
											/>
										</div>
										<div className="flex-1 ml-4">
											<h3 className="text-lg font-medium">{item.title}</h3>
											<p className="text-muted-foreground">
												Qty: {item.quantity}
											</p>
										</div>
										<div className="text-lg font-bold">
											{formatCurrency(item.quantity * item.price)}
										</div>
									</div>
								))
							) : (
								<div className="text-center">No items in your cart</div>
							)}
						</div>
						<Separator className="my-6" />
						<div className="flex items-center justify-between">
							<p className="text-lg font-medium">Subtotal</p>
							<p className="text-lg font-bold">{formatCurrency(subtotal)}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-lg font-medium">Shipping</p>
							<p className="text-lg font-bold">{formatCurrency(70)}</p>
						</div>

						<Separator className="my-6" />
						<div className="flex items-center justify-between">
							<p className="text-xl font-bold">Total</p>
							<p className="text-xl font-bold">
								{formatCurrency(subtotal + 70)}
							</p>
						</div>
					</div>
					<div>
						{user ? (
							<>
								{cartItems.length > 0 && (
									<>
										<PayStackElements user={user} />
									</>
								)}
								{cartItems.length === 0 && (
									<div className="text-center">
										<p>No items in your cart</p>
										<Link href="/shop" className="mt-4">
											<Button>Add items to your cart</Button>
										</Link>
									</div>
								)}
							</>
						) : (
							<SignUp />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
