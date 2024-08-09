"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { Trash } from "lucide-react";
import { useCartStore } from "@/stores/cart-provider";

export default function CartPage() {

 const { products: cartItems, addToCart, removeFromCart, subtractFromCart } = useCartStore((state) => state);



  console.log({cartItems})

	const subtotal =
		cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0,
		) || 0;
	const discount = 10;
	const total = subtotal - discount;
	return (
		<div className="max-w-4xl px-4 py-12 mx-auto md:px-6">
			<h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
			<div className="grid gap-8">
				<div className="grid gap-6">
					{cartItems.map((item) => (
						<div
							key={item.id}
							className="grid grid-cols-[100px_1fr_100px] items-center gap-4 relative"
						>
							<Trash
								className="absolute top-0 right-0 w-6 h-6 text-red-500 cursor-pointer"
								onClick={() => removeFromCart({ ...item, quantity: 1 })}
							/>
							<img
								src={item.product_images[0].image_url}
								alt={item.title}
								width={100}
								height={100}
								className="object-cover rounded-lg"
								style={{ aspectRatio: "100/100", objectFit: "cover" }}
							/>
							<div className="grid gap-1">
								<h3 className="font-medium">{item.title}</h3>

								<div className="flex gap-x-2">
									{" "}
									<Button
										variant="outline"
										onClick={() => subtractFromCart({ ...item, quantity: 1 })}
									>
										-
									</Button>
									<span className="flex items-center justify-center min-w-44">
										Quantity {item.quantity}
									</span>
									<Button
										variant="outline"
										onClick={() => addToCart({ ...item, quantity: 1 })}
									>
										+
									</Button>
								</div>
							</div>
							<div className="grid gap-1 justify-self-end">
								<div className="font-medium">{formatCurrency(item.price)}</div>
								<div className="text-muted-foreground">
									{formatCurrency(item.price * item.quantity)}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="grid gap-6 py-6 rounded-lg bg-muted/40">
					<div className="grid gap-2">

						<Separator />
						<div className="flex items-center justify-between text-lg font-medium">
							<span>Subtotal</span>
							<span className="font-medium">{formatCurrency(subtotal)}</span>
						</div>
					</div>
					<div className="flex flex-col justify-between w-full gap-4 md:flex-row">
						<Link href="/shop" className="flex-1 max-w-[200px]">
							<Button
								variant="outline"
								size="lg"
								className="w-full text-white bg-blue-700"
							>
								Continue Shopping
							</Button>
						</Link>
						<Link href="/checkout" className="flex-1 max-w-[200px]">
							<Button size="lg" className="flex-1">
								Proceed to Checkout
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
