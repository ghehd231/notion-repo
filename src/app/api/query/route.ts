import { NextRequest } from "next/server";
import type {
  CardInfo,
  MultiSelectProperties,
  Properties,
  QueryResponse,
  ResultKey,
  ResultType,
} from "@/types/notion";

import { retrieveDatabase } from "@/app/utils/notion";

import { ResponseError, internalServerError } from "@/services/api/error";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("next_cursor") || "";

    const query: QueryResponse = await retrieveDatabase({
      next_cursor: !!cursor ? cursor : undefined,
    });

    const results: ResultType = query.results;

    const resultInfo = results.map((item) => {
      const { properties, created_time, public_url } = item as ResultKey;
      const titleProperties = properties["교육"] as Properties;
      const techProperties = properties["수행기술"] as MultiSelectProperties;

      return {
        id: item.id,
        date: created_time,
        title: titleProperties.title[0].plain_text,
        tech: techProperties.multi_select,
        public_url,
      } as CardInfo;
    });

    return Response.json({
      info: resultInfo,
      next_cursor: query.next_cursor,
      has_more: query.has_more,
    });
  } catch (error) {
    if (error instanceof ResponseError) {
      return Response.json(error, {
        status: error.status,
      });
    }
    return Response.json(internalServerError, { status: 500 });
  }
}
