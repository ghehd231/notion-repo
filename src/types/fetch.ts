export type ErrorStatusCode =
  | "BAD_PARAMETER" // 400
  | "UNAUTHORIZED" // 401
  | "FORBIDDEN" // 403
  | "NOT_FOUND" // 404
  | "SERVER_ERROR"; // 500

interface IResponseData {
  statusCode: string;
  message: string;
  data: unknown;
}

export interface ResponseData<T> extends IResponseData {
  statusCode: "OK";
  data: T;
}

export interface ResponseErrorData extends IResponseData {
  statusCode: ErrorStatusCode;
  data: string;
  message: string;
}
