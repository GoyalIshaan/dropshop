import { Request, NextFunction, RequestHandler } from 'express';

const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req: Request, res, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
