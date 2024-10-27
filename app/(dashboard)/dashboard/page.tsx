import { getOrderItemValues, getTotalOrders, getTotalOrderValue } from "@/utils/queries/orders";
import OrdersAnalytics from "./_components/orders-analytics";

const page = async () => {

  return <div>
    <OrdersAnalytics />
  </div>;
};
export default page;
