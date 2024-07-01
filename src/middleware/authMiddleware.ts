import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'; // Add import statement for Request, Response, and NextFunction
import asyncHandler from './asyncHandler';
import User from '../models/userModel';
import { IUser } from '../types';

//Protect routes
export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!,
        ) as jwt.JwtPayload;

        req.user = (await User.findById(decoded.userId).select(
          '-password',
        )) as IUser;
        if (!req.user) {
          return res
            .status(401)
            .json({ message: 'Not authorized, no user found' });
        }

        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  },
);

// Admin middleware
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next(); // Proceed if the user is an admin
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' }); // Respond with an error if not an admin
  }
};
