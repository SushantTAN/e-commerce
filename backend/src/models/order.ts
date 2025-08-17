import { DataTypes, Model, Optional } from 'sequelize';
import db from './index';
import User from './user'; // Import User model for association

interface OrderAttributes {
  id: string;
  userId: string;
  products: Array<{ productId: string; quantity: number }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: string;
  public userId!: string;
  public products!: Array<{ productId: string; quantity: number }>;
  public totalAmount!: number;
  public status!: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  public shippingAddress!: string;
}



export default Order;
