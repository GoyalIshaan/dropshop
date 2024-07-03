import 'express';
import { Document } from 'mongoose';

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
}

declare module 'express' {
  interface Request {
    user?: IUser;
  }
  interface Response {
    cookie(
      name: string,
      val: string,
      options: import('./types').CookieOptions,
    ): this;
  }
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
  reviews: Review[];
};

export type CartItem = Product & { qty: number };

export type CartState = {
  items: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
};

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export interface PaymentFormData {
  paymentMethod: string;
}
export interface ShippingFormData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export type OrderItemsElement = {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
};

export type OrderState = {
  orderItems: OrderItemsElement[];
  user: IUser;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  paymentResult: PaymentResult | undefined;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
};

export type FinalOrderState = OrderState & {
  _id: string;
};

export type PaymentResult = {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
};

export type Review = {
  user: IUser;
  name: string;
  rating: number;
  comment: string;
};
