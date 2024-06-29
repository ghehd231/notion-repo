import type {
  CardResponseType,
  Properties,
  QueryResponse,
  ResultKey,
  ResultType,
} from "@/types/notion";

import { retrieveDatabase } from "@/app/utils/notion";

import { ResponseError, internalServerError } from "@/services/api/error";

export async function GET() {
  try {
    const query: QueryResponse = await retrieveDatabase();
    const results: ResultType = query.results;

    const res = results.map((item) => {
      const { properties, created_time } = item as ResultKey;
      const notionProperties = properties["교육"] as Properties;
      return {
        // ...properties,
        id: item.id,
        date: created_time,
        title: notionProperties.title[0].plain_text,
      } as CardResponseType;
    });

    return Response.json(res);
  } catch (error) {
    if (error instanceof ResponseError) {
      return Response.json(error, {
        status: error.status,
      });
    }
    return Response.json(internalServerError, { status: 500 });
  }
}
