"use client";

import Container from "@/components/container";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import MobileSlide from "./mobile-slide";
import { ArrowLeft, MenuIcon, Search, ShoppingBag, ShoppingBasket, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-provider";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const categories = [
  { name: "Necklaces", slug: "necklaces" },
  { name: "Earrings", slug: "earrings" },
  { name: "Bracelets", slug: "bracelets" },
  { name: "Rings", slug: "rings" },
  { name: "Anklets", slug: "anklets" },
  { name: "Hair Accessories", slug: "hair-accessories" },
];

const MobilePublicHeader = ({ user }: { user: User | null }) => {
  const { products: cartItems, addToCart } = useCartStore((state) => state);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="container flex items-center justify-between py-1 shadow md:hidden">
      <Sheet open={isOpen} onOpenChange={toggleMenu}>
        <SheetTrigger asChild>
          <Button
            onClick={toggleMenu}
            onKeyDown={toggleMenu}
            variant="outline"
            className="z-50 p-4"
            aria-label="Open menu"
          >
            <MenuIcon size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="pt-2 pb-3 space-y-1">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                onClick={toggleMenu}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <Input
                    type="search"
                    name="search"
                    id="mobile-search"
                    className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/">
        <Image
          src="https://utfs.io/f/56edb8fd-9cdd-498d-9501-c1e54d015570-n0631b.webp"
          alt="Glam Beads"
          width={600}
          height={312}
          className="object-cover w-24"
        />
      </Link>
      <div>
        <Link href="/cart" className="relative isolate">
          <Button
            variant="outline"
            className={cn(
              "p-2 text-gray-700",
              cartItems.length > 0 && "text-primary"
            )}
          >
            <ShoppingBasket size={24} />
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
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default MobilePublicHeader;
