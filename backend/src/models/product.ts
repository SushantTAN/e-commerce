import { DataTypes, Model, Optional } from 'sequelize';
import Category from './category'; // Import Category model

interface ProductAttributes {
  id: string; // Changed to string (UUID)
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string; // New field for foreign key
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: string; // Changed to string (UUID)
  public name!: string;
  public description!: string;
  public price!: number;
  public imageUrl!: string;
  public categoryId!: string; // New field for foreign key
  public stock!: number;

  // Associations
  public category?: Category; // To hold the associated Category object

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Note: The actual Product.init is done in backend/src/models/index.ts
// This file primarily serves for type definitions and potentially associations if defined here.

export default Product;