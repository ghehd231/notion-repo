import type { ErrorStatusCode } from "@/types/fetch";

export class ResponseError extends Error {
  statusCode: ErrorStatusCode;

  data?: string;

  status?: number;

  constructor(
    message: string,
    statusCode: ErrorStatusCode,
    data?: string,
    status?: number
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.status = status;
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      data: this.data,
    };
  }
}

export const internalServerError = new ResponseError(
  "Internal Server Error",
  "SERVER_ERROR",
  "ResponseError"
);
