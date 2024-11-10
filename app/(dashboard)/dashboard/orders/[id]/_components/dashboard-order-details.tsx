import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Database } from "@/supabase";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowLeft, Calendar, DollarSign, MapPin, Package, Truck, User } from "lucide-react";
import Link from "next/link";
import UpdateOrderStatus from "./update-order-status";
import ShippingAddress from "./shipping-address";
import OrderItems from "./order-items";

const Dashboardorder = ({order}:{order:Database['public']['Tables']['orders']['Row']}) => {


    return (
      <div className="container mx-auto py-10">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/orders">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Orders</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Order Ref:{order.transaction_id}</h1>
          </div>
          <UpdateOrderStatus orderId={order.id} status={order.status} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Details about the order and its current status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Order Date</p>
                  <p className="text-sm text-muted-foreground">
                    {order.created_at}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Order Status</p>
                  <p className="text-sm text-muted-foreground">
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(order.total_amount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>
                Details about the customer who placed the order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Customer Name</p>
                  <p className="text-sm text-muted-foreground">
                    {order.first_name} {order.last_name}
                  </p>
                </div>
              </div>
              <ShippingAddress shippingAddressId={order.shipping_address_id} />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>
              List of items included in this order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrderItems orderId={order.id} />
          </CardContent>
          <CardFooter className="flex justify-end">
            <div className="text-right">
              <p className="text-lg font-bold">
                Total: {formatCurrency(order.total_amount)}
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
};
export default Dashboardorder;
