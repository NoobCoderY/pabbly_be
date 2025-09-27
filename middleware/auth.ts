import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';

export const authenticate = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as any;
    req.user  = decoded;
    next();
  } catch (err) {
    return next(new ErrorHandler(err.message, 401));
  }
};
