import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function HomePageCallToAction() {
  return (
    <section>
      <div className="flex justify-center w-full px-4 py-12 item-center md:px-6 lg:px-20">
        <div className="flex flex-col items-center justify-between w-full px-4 py-10 sm:flex-row md:px-6 lg:px-12 xl:px-20 sm:space-x-8">
          <div className="flex flex-col items-center sm:jusitfy-start sm:items-start">
            <h1 className="mt-2 text-xl font-semibold text-gray-800 lg:mt-3 sm:text-2xl lg:text-4xl md:leading-6 lg:leading-9">
              Hand Crafted Bracelets
            </h1>
            <Link href="/categories/bracelets">
              <Button className="hidden px-8 mt-4 text-base font-medium leading-none text-white bg-gray-800 rounded-none focus:bg-gray-900 sm:block hover:bg-gray-700">
                Show Bracelets
              </Button>
            </Link>
          </div>
          <div>
            <img
              className="object-cover mt-8 sm:mt-0 w-80 md:w-96 xl:w-96 2xl:w-auto"
              src="https://utfs.io/f/46e45053-0e7e-4770-b3f8-516271cfb5c8-6gjsha.jpg"
              alt="lights"
            />
          </div>
          <Link href="/categories/bracelets">
            <Button className="w-full px-8 mt-4 text-base font-medium leading-none text-white bg-gray-800 rounded-none focus:bg-gray-900 sm:hidden hover:bg-gray-700">
              Show Bracelets
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
