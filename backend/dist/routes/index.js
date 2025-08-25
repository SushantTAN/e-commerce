"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const product_1 = __importDefault(require("./product"));
const user_1 = __importDefault(require("./user"));
const order_1 = __importDefault(require("./order")); // Import order routes
const category_1 = __importDefault(require("./category"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/products', product_1.default);
router.use('/user', user_1.default);
router.use('/orders', order_1.default); // Add order routes
router.use('/categories', category_1.default);
exports.default = router;
