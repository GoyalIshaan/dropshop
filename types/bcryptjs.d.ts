declare module 'bcryptjs' {
  export function hash(
    s: string,
    salt: number | string,
    callback?: (err: Error, hash: string) => void,
  ): void;
  export function hashSync(s: string, salt: number | string): string;
  export function compare(
    s: string,
    hash: string,
    callback?: (err: Error, success: boolean) => void,
  ): void;
  export function compareSync(s: string, hash: string): boolean;
}
