"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
}
// Note: The actual Product.init is done in backend/src/models/index.ts
// This file primarily serves for type definitions and potentially associations if defined here.
exports.default = Product;
