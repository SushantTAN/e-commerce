import { Request, Response } from 'express';
import Product from '../models/product';
import db from '../models/index';
import { Op } from 'sequelize';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { categoryId, search, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

    const where: any = {};
    if (categoryId) {
      where.categoryId = categoryId as string;
    }
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    const order: any = [];
    if (sortBy) {
      order.push([sortBy as string, (sortOrder as string) || 'ASC']);
    }

    const products = await Product.findAndCountAll({
      where,
      order,
      offset: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
      include: { model: db.Category, as: 'category' },
    });

    res.status(200).json({
      data: products.rows,
      totalPages: Math.ceil(products.count / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, { include: { model: db.Category, as: 'category' } });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { categoryId, ...productData } = req.body;
    const product = await Product.create({ ...productData, categoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { categoryId, ...productData } = req.body;
    const [updated] = await Product.update({ ...productData, categoryId }, { where: { id } });
    if (updated) {
      const updatedProduct = await Product.findByPk(id, { include: { model: db.Category, as: 'category' } });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
