"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent,  SheetTrigger } from "@/components/ui/sheet";
import {  MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileSlide = () => {

  const [isOpen, setIsOpen] = useState(false);

  return <Sheet open={isOpen} onOpenChange={setIsOpen}>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon">
        <MenuIcon size={24} />
      </Button>
    </SheetTrigger>
    <SheetContent className="min-w-[280px]">
      <div>
        <Link className="font-semibold text-2xl" href="/">
          Home
        </Link>
      </div>
    </SheetContent>
  </Sheet>;
};
export default MobileSlide;
