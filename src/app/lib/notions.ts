import { cache } from "react";
import { NotionAPI } from "notion-client";

const notion = new NotionAPI({
  authToken: process.env.NEXT_NOTION_TOKEN,
  activeUser: process.env.NOTION_ACTIVE_USER,
});

//react cache 적용하여 한번만 호출되게 수정
//https://nextjs-ko.org/docs/app/building-your-application/caching#react-cache-function
export const getPage = cache(async (id: string) => {
  const page = await notion.getPage(id, {
    fetchCollections: false,
    fetchMissingBlocks: true,
    signFileUrls: true,
  });
  return page;
});

export default notion;
