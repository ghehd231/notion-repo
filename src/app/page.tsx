import { Metadata } from "next";
import { getPageTitle } from "notion-utils";

import { commonTitle } from "./data/metaTitle";

import { rootNotionPageId } from "./lib/config";
import notion from "./lib/notions";

import NotionPage from "./components/NotionPage";

export async function generateMetadata(): Promise<Metadata> {
  const recordMap = await notion.getPage(rootNotionPageId);
  const title = getPageTitle(recordMap);

  return {
    title: commonTitle + title,
    description: `about ${title}`,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function Home() {
  const recordMap = await notion.getPage(rootNotionPageId); //getting notion data on Server Side

  return (
    <main>
      <NotionPage recordMap={recordMap} rootPageId={rootNotionPageId} />
    </main>
  );
}
