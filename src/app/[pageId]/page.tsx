import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getPageTitle } from "notion-utils";

import { getPage } from "@/app/lib/notions";

import { commonTitle } from "@/app/data/metaTitle";

import type { Metadata } from "next";

const NotionPage = dynamic(() => import("@/app/components/NotionPage"));

type Props = {
  params: Promise<{ pageId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { pageId } = await params;
    const recordMap = await getPage(pageId);
    const title = getPageTitle(recordMap);

    return {
      title: commonTitle + title,
      description: `about ${title}`,
    };
  } catch (err) {
    return {
      title: commonTitle,
      description: "Not found Title",
    };
  }
}

const Page = async ({ params }: Props) => {
  const { pageId } = await params;
  const recordMap = await getPage(pageId);

  return (
    <Suspense fallback={"loading..."}>
      <NotionPage recordMap={recordMap} />
    </Suspense>
  );
};

export default Page;
