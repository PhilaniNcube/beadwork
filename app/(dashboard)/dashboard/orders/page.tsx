import { getOrders } from "@/utils/queries/orders";
import { getAdmin } from "@/utils/queries/users";
import { redirect } from "next/navigation";
import OrdersPage from "./_components/orders-page";

const DashboardOrdersPage = async () => {
  const isAdmin = await getAdmin();

  if (!isAdmin) {
    redirect("/login");
  }

  const ordersData = await getOrders();

  if (ordersData.error) {
    return <div>{ordersData.error}</div>;
  }

  if (!ordersData.data) {
    return <div>Loading...</div>;
  }

  if (ordersData.data.length === 0) {
    return <div>No orders found</div>;
  }

  return (
    <div>
      <OrdersPage orders={ordersData.data} />
    </div>
  );
};
export default DashboardOrdersPage;
