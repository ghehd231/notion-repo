import { rootNotionPageId } from "./lib/config";
import notion from "./lib/notions";

export default async function Home() {
  const pageId = rootNotionPageId;
  const recordMap = await notion.getPage(pageId); //getting notion data on Server Side
  console.log("test", recordMap);
  return <main>test</main>;
}
