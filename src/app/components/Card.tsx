import Image from "next/image";
import { Box, Inset, Strong, Card, Text } from "@radix-ui/themes";
import { CardResponseType } from "@/types/notion";

type CardProps = Pick<CardResponseType, "date"> & { title: string };

const CustomCard = ({ title, date }: CardProps) => {
  return (
    <Box maxWidth="240px">
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <Image
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            width={240}
            height={140}
          />
        </Inset>
        <Text as="p" size="3">
          <Strong>{title}</Strong>
        </Text>
        <Text>{date}</Text>
      </Card>
    </Box>
  );
};
export default CustomCard;
