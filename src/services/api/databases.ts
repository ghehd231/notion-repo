import { CardResponseType } from "@/types/notion";

export const fetchDatabase = async ({
  next_cursor,
}: {
  next_cursor?: string;
}) => {
  const res = await fetch(`/api/query?next_cursor=${next_cursor}`, {
    method: "GET",
  });
  return res.json() as Promise<CardResponseType>;
};
