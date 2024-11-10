import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatCurrency";
import { getOrderByTransactionId } from "@/utils/queries/orders";
import { format } from "date-fns";
import { ArrowLeft, Package, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function OrderSummary({params}:{params: Promise<{reference:string}>}) {

  const { reference } = await params;

  const {data, error, status, order_items, shipping_address} = await getOrderByTransactionId(reference);

  if (error || !data) {
    return <div>Could not retrieve order data</div>;
  }




  // This would typically come from a database or API
  const orderDetails = {
    orderNumber: "#12345",
    orderDate: "June 1, 2023",
    status: "Processing",
    items: [
      { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1 },
      { id: 2, name: "Phone Case", price: 19.99, quantity: 2 },
    ],
    subtotal: 119.97,
    shipping: 5.99,
    tax: 10.8,
    total: 136.76,
    shippingAddress: "123 Main St, Anytown, AN 12345",
    paymentMethod: "Visa ending in 1234",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="w-full mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">
                Order Summary
              </CardTitle>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print Order
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <p className="font-semibold">
                  Order Number: {data.transaction_id}
                </p>
                <p className="text-sm text-gray-500">
                  Placed on {format(data.created_at, "PPP")}
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  {data.status}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Items Ordered</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order_items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product_id}</TableCell>
                      <TableCell>{formatCurrency(item.price)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p className="text-sm text-gray-600">
                  {shipping_address.street_address}, {shipping_address.city}
                </p>
              </div>

            </div>

            <Separator />

            <div className="flex justify-end">
              <div className="w-full max-w-xs space-y-2">




                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{formatCurrency(data.total_amount)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/account">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Link>
            </Button>

          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
