import { Metadata } from "next";
import { getPage } from "@/app/utils/notion";

import { rootNotionPageId } from "../lib/config";

export const metadata: Metadata = {
  title: "my page",
  description: "introduce page",
};

const NotionPage = async () => {
  const page = await getPage(rootNotionPageId);
  console.log(page);
  return <div>Notion Test Page</div>;
};

export default NotionPage;
