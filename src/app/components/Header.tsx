"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { cn } from "../utils";

import Tab from "./Tab";

const Header = () => {
  return (
    <NavigationMenuPrimitive.Root className="sticky top-0 z-50 flex justify-between bg-white/85 backdrop-blur-sm shadow-[0_0.125rem_1.25rem_0_rgba(0,0,0,0.06)] transition duration-300 ease-in-out">
      <NavigationMenuPrimitive.List className="flex flex-row p-2 space-x-1 xs:space-x-2">
        <Tab title="Resume" href="/" />
        <Tab title="Posts" href="/notion" />
        <Tab title="Github" href="https://github.com/ghehd231" />
      </NavigationMenuPrimitive.List>
      <NavigationMenuPrimitive.List className="flex flex-row p-2 space-x-2">
        <NavigationMenuPrimitive.Item
          className={cn(
            "flex items-center py-2 text-sm rounded-md",
            "text-sm font-medium text-gray-700 dark:text-gray-100"
          )}
        >
          <span className="gap-2 p-3 notion-property-select-item notion-item-default">
            <MagnifyingGlassIcon />
            <Image
              src="/image/mac-command.png"
              width={14}
              height={14}
              alt="command"
            />
            Command + K
          </span>
        </NavigationMenuPrimitive.Item>
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
};
export default Header;
