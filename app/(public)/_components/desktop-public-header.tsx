"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-provider";
import { Database } from "@/supabase";
import { logOutAction } from "@/utils/actions/auth";
import type { User } from "@supabase/supabase-js";
import {
  ArrowBigLeft,
  ArrowLeft,
  LogOutIcon,
  Menu,
  Search,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasket,
  UserIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const categories = [
  { name: "Necklaces", slug: "necklaces" },
  { name: "Earrings", slug: "earrings" },
  { name: "Bracelets", slug: "bracelets" },
  { name: "Rings", slug: "rings" },
  { name: "Anklets", slug: "anklets" },
  { name: "Hair Accessories", slug: "hair-accessories" },
];

const DesktopPublicHeader = ({ user, categories }: { user: User | null, categories: Database['public']['Tables']['categories']['Row'][] }) => {
  console.log(user);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const { products: cartItems, addToCart } = useCartStore((state) => state);

  const router = useRouter();



  return (
    <nav className="hidden bg-white shadow md:block @container">
      <div className="container px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="https://uijjfslwyuylxchlehlc.supabase.co/storage/v1/object/public/images/glambeads-new-logo.jpg"
                alt="Glambeads"
                width={652}
                height={122}
                className="object-cover w-16 aspect-square"
              />
              <span className="sr-only">Glambeads</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-5">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-primary hover:text-primary"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 @lg:flex sm:items-center">
            <div className="w-full max-w-lg lg:max-w-xs ">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <form
                className="relative"
                action={(formData: FormData) => {
                  const search = formData.get("search");
                  router.push(`/shop?q=${search}`);
                }}
              >
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Search"
                />
              </form>
            </div>
            <div className="flex flex-row ml-4">
              <Link href="/cart" prefetch={false}>
                <Button variant="ghost" className="relative" size="icon">
                  <ShoppingBag className="w-6 h-6" aria-hidden="true" />
                  {cartItems.length > 0 && (
                    <em
                      className={cn(
                        "text-sm font-semibold absolute top-1 right-0",
                        cartItems.length > 0 ? "text-red-600" : ""
                      )}
                    >
                      {cartItems.length}
                    </em>
                  )}

                  <span className="sr-only">Shopping cart</span>
                </Button>
              </Link>

              {user !== null ? (
                <>
                  <Link href="/account">
                    <Button size="icon" variant="ghost">
                      <UserIcon
                        className="w-6 h-6 text-yellow-700"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Account</span>
                    </Button>
                  </Link>
                  <form action={logOutAction}>
                    <Button type="submit" size="icon" variant="ghost">
                      <LogOutIcon
                        className="w-6 h-6 text-red-700"
                        aria-hidden="true"
                      />
                    </Button>
                  </form>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="icon">
                    <UserIcon className="w-6 h-6" aria-hidden="true" />
                    <span className="sr-only">Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default DesktopPublicHeader;
