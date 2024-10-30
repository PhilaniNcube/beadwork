"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/stores/cart-provider";
import { checkoutAction } from "@/utils/actions/purchase";
import type { User } from "@supabase/supabase-js";
import { useFormState } from "react-dom";

const PayStackElements = ({ user }: { user: User | null }) => {
	const {
		products: cartItems,
	} = useCartStore((state) => state);

	const subtotal =
		cartItems.reduce((total, item) => total + item.price * item.quantity, 0) ||
		0;


	return (
		<div>
			<h1 className="mb-4 text-2xl font-bold">Checkout</h1>
			<form action={(formData:FormData) => {
        checkoutAction(formData, cartItems)
      }} className="space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<Label htmlFor="first_name">First Name</Label>
						<Input id="first_name" name="first_name" placeholder="John" />
					</div>
					<div>
						<Label htmlFor="last_name">Last Name</Label>
						<Input id="last_name" name="last_name" placeholder="Doe" />
					</div>
					<div>
						<Label htmlFor="phone_number">Phone Number</Label>
						<Input id="phone_number" name="phone_number" placeholder="" />
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" name="email" placeholder="john@example.com" />
					</div>
				</div>
				<div>
					<Label htmlFor="street_address">Street Address</Label>
					<Textarea
						id="street_address"
						name="street_address"
						placeholder="123 Main Street"
					/>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<Label htmlFor="city">City</Label>
						<Input id="city" type="text" name="city" placeholder="" />
					</div>
					<div>
						<Label htmlFor="postal_code">Postal Code</Label>
						<Input
							id="postal_code"
							name="postal_code"
							placeholder="Enter postal code"
						/>
            <Input type="hidden" name="total_amount" value={subtotal + 70} />
					</div>
				</div>
				<Button type="submit" className="w-full">
					Place Order
				</Button>
			</form>
		</div>
	);
};
export default PayStackElements;
