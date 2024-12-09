import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { cn } from "../utils";
import { usePathname } from "next/navigation";

type Props = {
  title: string;
  href: string;
};

const Tab = ({ title, href }: Props) => {
  const pathName = usePathname();

  const isMatching = pathName === href;

  return (
    <NavigationMenuPrimitive.Item asChild>
      <NavigationMenuPrimitive.Link
        href={href}
        className={cn(
          "px-2 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900",
          "text-sm font-medium text-gray-900 dark:text-gray-600",
          "xs:px-3 xs:py-2 xs:text-gray-700 xs:dark:text-gray-100",
          isMatching && "border-b-[1px] border-b-slate-950 rounded-none"
        )}
      >
        {title}
      </NavigationMenuPrimitive.Link>
    </NavigationMenuPrimitive.Item>
  );
};
export default Tab;
