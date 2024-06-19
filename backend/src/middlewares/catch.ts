/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestHandler } from "express";

export function _catch(
  ...handlers: RequestHandler<any, any, any, any, any>[]
): RequestHandler<any, any, any, any, any> {
  return (req, res, next) => {
    Promise.resolve(handlers.reduce(async (acc, handler) => {
      try {
        await acc
        await handler(req, res, next)
      } catch (error) {
        next(error)
      }
    }, Promise.resolve()))
  };
}
