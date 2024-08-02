import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@supabase/supabase-js";
import { ArrowBigLeft, ArrowLeft, Search, ShoppingBagIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const DesktopPublicHeader = ({ user }: { user: User | null }) => {
	return (
		<div className="items-center hidden md:flex">
			<Container>
				<div className="flex items-center justify-between w-full">
					<div>
						<Link className="font-semibold" href="/">
							Home
						</Link>
					</div>
					<form className="flex-1 min-w-[200px] max-w-[600px] flex flex-row relative px-10">
						<Input
							placeholder="Search"
							type="search"
							className="h-8 rounded-full"
						/>
						<Button className="h-8" variant="ghost">
							<Search
								size={24}
								className="text-slate-800 -translate-x-[50px] border-l border-slate-700 pl-1"
							/>
						</Button>
					</form>
					{user ? (
						<div className="flex items-center gap-x-4">
							<Link href="/account">
								<UserIcon size={24} />
							</Link>
							<form>
								<Button variant="destructive" size="sm" type="submit">
									<ArrowLeft size={24} />
								</Button>
							</form>
							<Link href="/cart">
								<ShoppingBagIcon size={24} />
							</Link>
						</div>
					) : (
						<div className="flex items-center gap-x-4">
							<Link href="/login">Log In</Link>
							<Link href="/sign-up">Sign up</Link>
							<Link href="/cart">
								<ShoppingBagIcon size={24} />
							</Link>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};
export default DesktopPublicHeader;
