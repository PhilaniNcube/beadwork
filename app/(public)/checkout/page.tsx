import { getCurrentUser } from "@/utils/queries/users";
import Checkout from "./_components/checkout";

const CheckoutPage = async () => {

  const user = await getCurrentUser();

  return <div>
    <Checkout user={user} />
  </div>;
};
export default CheckoutPage;
