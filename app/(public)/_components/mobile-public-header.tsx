import Container from "@/components/container";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import MobileSlide from "./mobile-slide";

const MobilePublicHeader = ({ user }: { user: User | null }) => {



	return <div className="flex md:hidden">
    <Container>
      <div className="flex items-center justify-between">
        <Link href="/">
          Home
        </Link>
        <div className="flex items-center gap-x-3">
          <MobileSlide />
        </div>
      </div>
    </Container>
  </div>;
};
export default MobilePublicHeader;
