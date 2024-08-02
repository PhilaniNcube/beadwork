import Container from "@/components/container";
import DesktopPublicHeader from "./desktop-public-header";
import { getCurrentUser } from "@/utils/queries/users";
import MobilePublicHeader from "./mobile-public-header";

const PublicHeader = async () => {

  const user = await getCurrentUser();

  return <header className="bg-slate-950 text-white">
   <DesktopPublicHeader user={user} />
   <MobilePublicHeader user={user} />
  </header>;
};
export default PublicHeader;
