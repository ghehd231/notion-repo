import { Metadata } from "next";

import { rootNotionPageId } from "./lib/config";
import notion from "./lib/notions";

import NotionPage from "./components/NotionPage";

export const metaData: Metadata = {
  title: "Notion page",
};

export default async function Home() {
  const pageId = rootNotionPageId;
  const recordMap = await notion.getPage(pageId); //getting notion data on Server Side
  console.log("test", recordMap);
  return (
    <main>
      <NotionPage recordMap={recordMap} rootPageId={pageId} />
    </main>
  );
}
