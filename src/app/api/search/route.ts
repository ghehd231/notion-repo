import { NextRequest } from "next/server";

import type { SearchParameters } from "@notionhq/client/build/src/api-endpoints";

import { searchDatabase } from "@/app/utils/notion";
import { ResponseError, internalServerError } from "@/services/api/error";

export const dynamic = "auto";
export async function POST(request: NextRequest) {
  try {
    const searchParams = (await request.json()) as SearchParameters;

    const res = await searchDatabase(searchParams);
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
