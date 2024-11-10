import { getOrderById } from "@/utils/queries/orders";
import { getAdmin } from "@/utils/queries/users";
import { redirect } from "next/navigation";
import Dashboardorder from "./_components/dashboard-order-details";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const admin = await getAdmin();
  console.log(admin);

  if (!admin) {
    redirect("/login");
  }

  // get order by id
  const { data: order, error, status } = await getOrderById(id);

  if (error || order === null || status !== 200 || !order) {
    return <div >Could not fetch the order</div>;
  }

  return <div>
    <Dashboardorder order={order} />
  </div>;
};
export default page;
