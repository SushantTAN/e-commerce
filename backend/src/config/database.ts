import dotenv from 'dotenv';

dotenv.config();

const sharedConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

export const development = {
  ...sharedConfig,
  database: process.env.DB_NAME,
};

export const test = {
  ...sharedConfig,
  database: process.env.DB_NAME_TEST,
};

export const production = {
  ...sharedConfig,
  database: process.env.DB_NAME_PROD,
};
