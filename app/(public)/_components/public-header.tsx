import Container from "@/components/container";
import DesktopPublicHeader from "./desktop-public-header";
import { getCurrentUser } from "@/utils/queries/users";
import MobilePublicHeader from "./mobile-public-header";
import { getCategories } from "@/utils/queries/categories";

const PublicHeader = async () => {

  const userData =  getCurrentUser();
  const categoryData = getCategories();

  const [user] = await Promise.all([userData]);

  return <header className="text-black">
   <DesktopPublicHeader user={user} />
  </header>;
};
export default PublicHeader;
