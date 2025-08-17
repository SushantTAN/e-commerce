import { DataTypes, Model, Sequelize } from 'sequelize';
import db from './index';

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role!: 'user' | 'admin';
  public passwordResetToken?: string | null;
  public passwordResetExpires?: Date | null;
}





export default User;
