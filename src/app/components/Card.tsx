import { MemoExoticComponent, memo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

import type { CardInfo } from "@/types/notion";

import { Box, Inset, Strong, Card, Text, Skeleton } from "@radix-ui/themes";

type CardProps = Pick<CardInfo, "date" | "public_url"> & {
  title: string;
  loading?: boolean;
};

const CustomCard = ({
  title,
  date,
  public_url,
  loading = false,
}: CardProps) => {
  return (
    <Box
      maxWidth="240px"
      maxHeight="250px"
      width="100%"
      height="100%"
      overflow="hidden"
      asChild
    >
      <Link href={`${public_url}`}>
        <Card size="1">
          <Skeleton loading={loading}>
            <Inset clip="padding-box" side="top" pb="current">
              <Image
                src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Bold typography"
                width={240}
                height={140}
              />
            </Inset>
          </Skeleton>
          <Skeleton loading={loading} width="100px" mt="1" mb="1">
            <Text as="div" size="3" truncate>
              <Strong>{title}</Strong>
            </Text>
          </Skeleton>
          <Skeleton loading={loading}>
            <Text as="p">{format(date, "yyyy-MM-dd")}</Text>
          </Skeleton>
        </Card>
      </Link>
    </Box>
  );
};

export default memo(CustomCard) as MemoExoticComponent<typeof CustomCard>;
