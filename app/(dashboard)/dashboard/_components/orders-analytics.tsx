import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/supabase";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  getOrdersByStatus,
  getTotalOrders,
  getTotalOrderValue,
} from "@/utils/queries/orders";
import { DollarSign, ShoppingCart } from "lucide-react";

const OrdersAnalytics = async () => {
  const totalOrdersData = getTotalOrders();
  const totalValueData = getTotalOrderValue();
  const totalProcessingOrdersData = getOrdersByStatus("PROCESSING");
  const totalShippedOrdersData = getOrdersByStatus("SHIPPED");
  const totalPendingOrdersData = getOrdersByStatus("PENDING");

  const [
    totalOrdersResult,
    totalValue,
    totalProcessingOrders,
    totalShippedOrders,
    totalPendingOrders,
  ] = await Promise.all([
    totalOrdersData,
    totalValueData,
    totalProcessingOrdersData,
    totalShippedOrdersData,
    totalPendingOrdersData,
  ]);
  console.log({
    totalOrdersResult,
    totalValue,
    totalProcessingOrders,
    totalShippedOrders,
    totalPendingOrders,
  });

  // write a function to sum the total value of orders and return the value
  const sumTotalValue = (orders:{id:string, total_amount:number}[]) => {
    return orders.reduce((acc, order) => acc + order.total_amount, 0);
  }

  let processingOrders = totalProcessingOrders.data || []
  let shippedOrders = totalShippedOrders.data || []
  let pendingOrders = totalPendingOrders.data || []

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Orders Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Orders */}
        {totalValue.data && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalValue.data)}
              </div>
            </CardContent>
          </Card>
        )}
        {totalOrdersResult.count && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalOrdersResult.count}
              </div>
            </CardContent>
          </Card>
        )}
        {totalProcessingOrders.count && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Processing Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalProcessingOrders.count}
                <p className="text-sm text-muted-foreground font-normal">
                  ({formatCurrency(sumTotalValue(processingOrders))})
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        {totalPendingOrders.count && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pending Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalPendingOrders.count}
                <p className="text-sm text-muted-foreground font-normal">
                  ({formatCurrency(sumTotalValue(pendingOrders))})
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
export default OrdersAnalytics;
