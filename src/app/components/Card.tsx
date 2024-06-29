import Image from "next/image";
import { format } from "date-fns";
import { Box, Inset, Strong, Card, Text } from "@radix-ui/themes";

import type { CardResponseType } from "@/types/notion";
import Link from "next/link";

type CardProps = Pick<CardResponseType, "date" | "public_url"> & {
  title: string;
};

const CustomCard = ({ title, date, public_url }: CardProps) => {
  return (
    <Box maxWidth="240px" maxHeight="250px" overflow="hidden" asChild>
      <Link href={`${public_url}`}>
        <Card size="1">
          <Inset clip="padding-box" side="top" pb="current">
            <Image
              src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt="Bold typography"
              width={240}
              height={140}
            />
          </Inset>
          <Text as="div" size="3" truncate>
            <Strong>{title}</Strong>
          </Text>
          <Text as="p">{format(date, "yyyy-MM-dd")}</Text>
        </Card>
      </Link>
    </Box>
  );
};
export default CustomCard;
