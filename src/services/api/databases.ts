import { CardResponseType } from "@/types/notion";

export const fetchDatabase = async () => {
  const res = await fetch("/api/query", { method: "GET" });
  return res.json() as Promise<CardResponseType[]>;
};
