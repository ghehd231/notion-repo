"use client";

import { usePathname } from "next/navigation";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { cn } from "../utils";

const Header = () => {
  const pathName = usePathname();

  return (
    <NavigationMenuPrimitive.Root className="sticky top-0 z-50 flex justify-between bg-white/85 backdrop-blur-sm shadow-[0_0.125rem_1.25rem_0_rgba(0,0,0,0.06)] transition duration-300 ease-in-out">
      <NavigationMenuPrimitive.List className="flex flex-row p-2 space-x-2">
        <NavigationMenuPrimitive.Item asChild>
          <NavigationMenuPrimitive.Link
            href="/"
            className={cn(
              "px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100",
              pathName === "/" &&
                "border-b-[1px] border-b-slate-950 rounded-none"
            )}
          >
            Resume
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item asChild>
          <NavigationMenuPrimitive.Link
            href="/notion"
            className={cn(
              "px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100",
              pathName === "/notion" &&
                "border-b-[1px] border-b-slate-950 rounded-none"
            )}
          >
            Posts
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item asChild>
          <NavigationMenuPrimitive.Link
            href="https://github.com/ghehd231"
            className={cn(
              "px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900",
              "text-sm font-medium text-gray-700 dark:text-gray-100"
            )}
          >
            GitHub
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>
      </NavigationMenuPrimitive.List>
      <NavigationMenuPrimitive.List className="flex flex-row p-2 space-x-2">
        <NavigationMenuPrimitive.Item
          className={cn(
            "flex items-center px-3 py-2 text-sm rounded-md",
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
