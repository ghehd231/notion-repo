import type { ErrorStatusCode } from "@/types/fetch";

export class ResponseError extends Error {
  data?: string;

  status?: number;

  constructor(message: string, data?: string, status?: number) {
    super(message);
    this.data = data;
    this.status = status;
  }

  toJSON() {
    return {
      message: this.message,
      data: this.data,
    };
  }
}

export const internalServerError = new ResponseError(
  "Internal Server Error",
  "SERVER_ERROR"
);
