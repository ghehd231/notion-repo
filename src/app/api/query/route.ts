import { retrieveDatabase } from "@/app/utils/notion";

export async function GET() {
  const query = await retrieveDatabase();

  return Response.json({ data: query.results });
}
