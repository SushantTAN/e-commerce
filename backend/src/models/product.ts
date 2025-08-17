import { DataTypes, Model } from 'sequelize';
import db from './index';

interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public imageUrl!: string;
  public category!: string;
  public stock!: number;
}



export default Product;
