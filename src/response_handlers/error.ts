// class ApiError extends Error {
//   public statusCode: number;
//   public data: null;
//   public success: boolean;
//   public errors: string[];

//   constructor(
//     statusCode: number,
//     message = "Something went wrong",
//     errors: string[] = []
//   ) {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.success = false;
//     this.errors = errors;
//     Error.captureStackTrace(this, this.constructor);
//   }

//   public toJSON(): {
//     statusCode: number;
//     success: boolean;
//     errors: string[];
//     message: string;
//   } {
//     return {
//       statusCode: this.statusCode,
//       success: this.success,
//       errors: this.errors,
//       message: this.message,
//     };
//   }
// }

// export default ApiError;

import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "./api_response";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  return ApiResponse.error(res, "Internal Server Error", 500);
};