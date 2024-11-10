import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { add } from "date-fns";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ reference: string }>;
}) {
  const { reference } = await searchParams;

  // write a function that adds 5 days to the current date
  const estimatedDelivery = () => {
    const today = new Date();
    const esitmatedDeliveryDate = add(today, { days: 5 });

    //  check if estimated delivery date is a weekend
    if (esitmatedDeliveryDate.getDay() === 6) {
      return add(esitmatedDeliveryDate, { days: 2 });
    }
    if (esitmatedDeliveryDate.getDay() === 0) {
      return add(esitmatedDeliveryDate, { days: 1 });
    }
    return esitmatedDeliveryDate;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-gray-900">
            Order Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Thank you for your purchase. Your order has been received and is now
            being processed.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <p className="text-sm text-gray-600">
              Payment Reference:{" "}
              <span className="font-semibold text-gray-900">{reference}</span>
            </p>
            <p className="text-sm text-gray-600">
              Estimated Delivery:{" "}
              <span className="font-semibold text-gray-900">
                {estimatedDelivery().toLocaleDateString()}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Next Steps:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>
                You will receive an order confirmation email with details of
                your purchase.
              </li>
              <li>
                You can track your order status in your account dashboard.
              </li>
              <li>
                If you have any questions, please contact our customer support.
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" variant="outline">
          <Link className="flex items-center justify-center w-full" href={`/account/orders/${reference}`}>
              <Package className="mr-2 h-4 w-4" /> View Order Details
          </Link>
            </Button>
          <Button className="w-full" asChild>
            <Link href="/shop">
              <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
