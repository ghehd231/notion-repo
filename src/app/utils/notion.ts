import { Client } from "@notionhq/client";

import { dataBaseId } from "@/app/lib/config";
import { SearchParameters } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NEXT_NOTION_TOKEN,
});

export const getPage = async (pageId: string) => {
  const res = await notion.pages.retrieve({ page_id: pageId });
  return res;
};

export const retrieveDatabase = async ({
  next_cursor,
}: {
  next_cursor?: string;
}) => {
  const query = await notion.databases.query({
    database_id: dataBaseId,
    start_cursor: next_cursor,
    page_size: 20,
  });
  return query;
};

export const searchDatabase = async (searchRequest: SearchParameters) => {
  const res = await notion.search(searchRequest);
  return res;
};
