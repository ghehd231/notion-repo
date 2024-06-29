import {
  PageObjectResponse,
  QueryDatabaseResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type QueryResponse = QueryDatabaseResponse;

export type ResultType =
  | Pick<QueryResponse, "results">
  | QueryResponse["results"];

export type ResultKey = Pick<
  PageObjectResponse,
  "properties" | "created_time" | "public_url"
>;

export type Properties = {
  type: "title";
  title: Array<Partial<RichTextItemResponse>>;
  id: string;
};

export type CardResponseType = Properties & {
  id: string;
  date: string;
  title: string;
  public_url: string;
};
