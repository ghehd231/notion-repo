import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getPageTitle } from "notion-utils";

import notion from "@/app/lib/notions";

import { commonTitle } from "@/app/data/metaTitle";

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
    <Suspense fallback={"loading..."}>
      <NotionPage recordMap={recordMap} />
    </Suspense>
  );
};

export default Page;
