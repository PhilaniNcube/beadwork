import { getDashboardProfiles } from "@/utils/queries/profiles";
import CustomerTable from "./_components/customer-table";

const DashboardCustomersPage = async () => {

  const profiles = await getDashboardProfiles();

  return <div><CustomerTable customers={profiles} /></div>;
};
export default DashboardCustomersPage;
