import {
  PageObjectResponse,
  QueryDataSourceResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type QueryResponse = QueryDataSourceResponse;

export type ResultType =
  | Pick<QueryResponse, "results">
  | QueryResponse["results"];

export type ResultKey = Pick<
  PageObjectResponse,
  "id" | "properties" | "created_time" | "public_url"
>;

export type Properties = {
  type: "title";
  title: Array<Partial<RichTextItemResponse>>;
  id: string;
};

export type StringRequest = string;
export type SelectColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

export type SelectPropertyResponse = {
  id: StringRequest;
  name: StringRequest;
  color: SelectColor;
};

export type MultiSelectProperties = {
  type: "multi_select";
  multi_select: Array<SelectPropertyResponse>;
  id: string;
};

export type CardInfo = {
  id: string;
  date: string;
  title: string;
  tech?: MultiSelectProperties["multi_select"];
  public_url: string;
};

export type CardResponseType = {
  info: CardInfo[];
  next_cursor: QueryResponse["next_cursor"];
  has_more: QueryResponse["has_more"];
};
