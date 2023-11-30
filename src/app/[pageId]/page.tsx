import dynamic from "next/dynamic";

import notion from "@/app/lib/notions";
import { getPageTitle } from "notion-utils";

import { commonTitle } from "../data/metaTitle";

import type { Metadata } from "next";

const NotionPage = dynamic(() => import("@/app/components/NotionPage"));

type Props = {
  params: { pageId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recordMap = await notion.getPage(params.pageId);
  const title = getPageTitle(recordMap);

  return {
    title: commonTitle + title,
    description: `about ${title}`,
  };
}

const Page = async ({ params: { pageId } }: Props) => {
  const recordMap = await notion.getPage(pageId);

  return (
    <>
      <NotionPage recordMap={recordMap} />
    </>
  );
};

export default Page;
