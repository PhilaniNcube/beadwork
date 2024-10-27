import Container from "@/components/container";
import DesktopPublicHeader from "./desktop-public-header";
import { getCurrentUser } from "@/utils/queries/users";
import MobilePublicHeader from "./mobile-public-header";
import { getCategories, getChildCategories } from "@/utils/queries/categories";

const PublicHeader = async () => {

  const userData =  getCurrentUser();
  const categoryData = getChildCategories();

  const [user, categoryResult] = await Promise.all([userData, categoryData]);

  const { data: categories } = categoryResult;



  return <header className="text-black">
   <DesktopPublicHeader user={user} categories={categories || []} />
   <MobilePublicHeader user={user} />
  </header>;
};
export default PublicHeader;
