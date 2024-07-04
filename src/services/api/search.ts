import {
  SearchParameters,
  SearchResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const fetchSearch = async (params: SearchParameters) => {
  const body = { ...params };
  const res = await fetch(`/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json() as Promise<SearchResponse>;
};
