/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'cookie-parser' {
  import { Request, Response, NextFunction } from 'express';

  function cookieParser(
    secret?: string | string[],
    options?: any,
  ): (req: Request, res: Response, next: NextFunction) => void;

  export default cookieParser;
}
