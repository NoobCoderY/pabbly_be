import { Request, Response,NextFunction } from 'express';
import User from '../model/userModel'
import ErrorHandler from '../utils/errorHandler';
import generateToken from '../utils/jwtHandler';

export const registerUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new ErrorHandler('User already exists', 401));
      }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      return next(new ErrorHandler(error.message, 401));
  }
};

export const loginUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: user._id });
    res.status(200).json({ token, user: { id: user._id, name: user.name } });
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
};
