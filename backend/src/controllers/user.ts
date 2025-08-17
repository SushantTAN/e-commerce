import { Request, Response } from 'express';
import User from '../models/user';

interface AuthRequest extends Request {
  user?: User;
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName } = req.body;
    const user = req.user;

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
