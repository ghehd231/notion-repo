import { Metadata } from "next";
import { getPageTitle } from "notion-utils";

import { commonTitle } from "./data/metaTitle";

import { rootNotionPageId } from "./lib/config";
import { getPage } from "./lib/notions";

import NotionPage from "./components/NotionPage";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const recordMap = await getPage(rootNotionPageId);
    const title = getPageTitle(recordMap);

    return {
      title: commonTitle + title,
      description: `about ${title}`,
      icons: {
        icon: "/favicon.ico",
      },
    };
  } catch (error) {
    return {
      title: commonTitle + "Error",
      description: "Failed to load page",
      icons: {
        icon: "/favicon.ico",
      },
    };
  }
}

export default async function Home() {
  try {
    const recordMap = await getPage(rootNotionPageId); //getting notion data on Server Side

    return (
      <main>
        <NotionPage recordMap={recordMap} rootPageId={rootNotionPageId} />
      </main>
    );
  } catch (error) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Failed to load page</h1>
        <p className="text-gray-600">There was an error loading the Notion page.</p>
      </main>
    );
  }
}
