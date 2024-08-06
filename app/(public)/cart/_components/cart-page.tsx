"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart-provider";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";

export default function CartPage() {

	const cartHook = useCart();
	const cart = cartHook ? cartHook((state) => state.cart) : null;
  console.log({cart})
	const subtotal =
		cart?.products.reduce(
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
					{cart?.products.map((item) => (
						<div
							key={item.id}
							className="grid grid-cols-[100px_1fr_100px] items-center gap-4"
						>
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
								<div className="flex items-center gap-2 text-muted-foreground">
									<span>Quantity:</span>
									<span>{item.quantity}</span>
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
				<div className="grid gap-6 p-6 rounded-lg bg-muted/40">
					<div className="grid gap-2">
						<div className="flex items-center justify-between">
							<span>Subtotal</span>
							<span className="font-medium">{formatCurrency(subtotal)}</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Discount</span>
							<span className="font-medium -text-green-500">
								-{formatCurrency(discount)}
							</span>
						</div>
						<Separator />
						<div className="flex items-center justify-between text-lg font-medium">
							<span>Total</span>
							<span>{formatCurrency(total)}</span>
						</div>
					</div>
					<div className="flex flex-col justify-between gap-4 md:flex-row">
						<Link href="/shop" className="flex-1">
							<Button variant="outline" size="lg" className="w-full text-white bg-blue-700">
								Continue Shopping
							</Button>
						</Link>
						<Button size="lg" className="flex-1">
							Proceed to Checkout
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
