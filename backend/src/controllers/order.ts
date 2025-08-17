import { Request, Response } from 'express';
import db from '../models';
import { AuthRequest } from '../middlewares/auth';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await db.Order.findAll({ include: { model: db.User, as: 'user' } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await db.Order.findByPk(req.params.id, { include: db.User });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Basic authorization: admin can view any order, user can view their own
    if (req.user.role !== 'admin' && req.user.id !== order.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { products, totalAmount, status, shippingAddress } = req.body;
    const userId = req.user.id;
    const newOrder = await db.Order.create({ userId, products, totalAmount, status, shippingAddress });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

export const updateOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { products, totalAmount, status, shippingAddress } = req.body;
    const order = await db.Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Admin can update any order, user can only update their own order status (e.g., cancel)
    if (req.user.role !== 'admin' && req.user.id !== order.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await order.update({ products, totalAmount, status, shippingAddress });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const order = await db.Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Only admin can delete orders
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await order.destroy();
    res.status(204).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
