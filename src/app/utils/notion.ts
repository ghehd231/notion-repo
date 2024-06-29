import { Client } from "@notionhq/client";

import { dataBaseId } from "../lib/config";

const notion = new Client({
  auth: process.env.NEXT_NOTION_TOKEN,
});

export const getPage = async (pageId: string) => {
  const res = await notion.pages.retrieve({ page_id: pageId });
  return res;
};

export const retrieveDatabase = async () => {
  const query = await notion.databases.query({
    database_id: dataBaseId,
  });
  return query;
};
