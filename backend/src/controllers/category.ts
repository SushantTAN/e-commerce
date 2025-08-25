import { Request, Response } from 'express';
import db from '../models';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await db.Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};