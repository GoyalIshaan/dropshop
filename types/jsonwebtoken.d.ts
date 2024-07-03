/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'jsonwebtoken' {
  export function sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string | Buffer,
    options?: any,
  ): string;
  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: any,
  ): any;
  export function decode(
    token: string,
    options?: any,
  ): null | { [key: string]: any } | string;
}
