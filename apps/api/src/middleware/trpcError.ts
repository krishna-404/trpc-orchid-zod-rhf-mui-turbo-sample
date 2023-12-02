import { TRPCError } from "@trpc/server";
import { ErrorRequestHandler } from "express";
import { logger } from "../configs/logger";

export const trpcErrorConvertor: ErrorRequestHandler = (error, _req, _res, next) => {
  if(!(error instanceof TRPCError)) {
    error = new TRPCError({
      message: error.message,
      code: error.statusCode,
      cause: error.stack
    });
  };
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  logger.debug(err);
}