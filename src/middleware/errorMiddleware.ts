import { Request, Response, NextFunction } from 'express';

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error: Error & { statusCode?: number } = new Error(
    `Not Found - ${req.originalUrl}`,
  );
  res.status(404);
  next(error);
};

export const errorHandler = (
  error: Error & { statusCode?: number; name?: string; kind?: string },
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🤫' : error.stack,
  });
};
