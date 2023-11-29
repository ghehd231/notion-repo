const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NEXT_NOTION_TOKEN,
});

export const getPage = async (pageId: string) => {
  const res = await notion.pages.retrieve({ page_id: pageId });
  return res;
};
