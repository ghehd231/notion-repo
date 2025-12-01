import { cache } from "react";
import { NotionAPI } from "notion-client";

const notion = new NotionAPI();

//react cache 적용하여 한번만 호출되게 수정
//https://nextjs-ko.org/docs/app/building-your-application/caching#react-cache-function
export const getPage = cache(async (id: string) => {
  const page = await notion.getPage(id);
  return page;
});

export default notion;
