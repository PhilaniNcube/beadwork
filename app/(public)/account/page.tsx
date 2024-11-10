import { getCurrentUser } from "@/utils/queries/users";
import Account from "./_components/account";
import { getOrdersByUserId } from "@/utils/queries/orders";

const AccountPage = async () => {

const currentUser = await getCurrentUser();

if (!currentUser) {
  return <div>Could not retrieve user data</div>;
}

// get all the current users orders
const {data, error} = await getOrdersByUserId(currentUser?.id);

  return (
    <div>
      <Account user={currentUser} orders={data!} />
    </div>
  );
};
export default AccountPage;
