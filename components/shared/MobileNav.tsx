import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { AlignRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Navitems from "./Navitems";

const MobileNav = () => {
  return (
    <nav className="md:hidden ">
      <Sheet>
        <SheetTrigger className="align-middle">
          <AlignRight />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
          <Separator className="border border-gray-50" />
          <Navitems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
