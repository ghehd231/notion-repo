"use client";
import { usePathname, useRouter } from "next/navigation";
import { Flex, Tabs, Text } from "@radix-ui/themes";

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Flex wrap="wrap" justify="between">
      <Tabs.Root defaultValue={pathName === "/notion" ? "notion" : "profile"}>
        <Tabs.List>
          <Tabs.Trigger
            value="profile"
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          >
            <Text size="3">Profile</Text>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="notion"
            onClick={() => router.push("/notion")}
            style={{ cursor: "pointer" }}
          >
            <Text size="3">Notion Blog</Text>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Flex>
  );
};
export default Header;
