import 'express';
import { Document } from 'mongoose';

declare module 'express' {
  interface Request {
    user?: IUser;
  }
  interface Response {
    cookie(name: string, val: string, options: CookieOptions): this;
  }
}

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
}

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  password: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export type CartItem = Product & {
  qty: number;
};

export type CartState = {
  items: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
