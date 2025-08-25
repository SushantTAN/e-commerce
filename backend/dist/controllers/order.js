"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrderById = exports.getAllOrders = exports.addToCart = exports.getCart = void 0;
const models_1 = __importDefault(require("../models"));
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const cart = yield models_1.default.Order.findOne({ where: { userId: req.user.id, status: 'cart' } });
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});
exports.getCart = getCart;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const product = yield models_1.default.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let cart = yield models_1.default.Order.findOne({ where: { userId, status: 'cart' } });
        if (!cart) {
            cart = yield models_1.default.Order.create({
                userId,
                products: [],
                totalAmount: 0,
                status: 'cart',
                shippingAddress: '',
            });
        }
        const existingProductIndex = cart.products.findIndex(p => p.productId === productId);
        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += quantity;
        }
        else {
            cart.products.push({ productId, quantity });
        }
        // Mark the products field as changed to ensure Sequelize updates the JSONB array
        cart.changed('products', true);
        cart.totalAmount = cart.products.reduce((total, p) => {
            // This assumes product price is stored on the product model
            // In a real app, you'd fetch the price securely
            return total + (product.price * p.quantity);
        }, 0);
        yield cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
});
exports.addToCart = addToCart;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield models_1.default.Order.findAll({ include: { model: models_1.default.User, as: 'user' } });
        res.status(200).json(orders);
    }
    catch (error) {
        console.log("error here", error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield models_1.default.Order.findByPk(req.params.id, { include: models_1.default.User });
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
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
});
exports.getOrderById = getOrderById;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { products, totalAmount, status, shippingAddress } = req.body;
        const userId = req.user.id;
        const newOrder = yield models_1.default.Order.create({ userId, products, totalAmount, status, shippingAddress });
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { products, totalAmount, status, shippingAddress } = req.body;
        const order = yield models_1.default.Order.findByPk(id);
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
        yield order.update({ products, totalAmount, status, shippingAddress });
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield models_1.default.Order.findByPk(id);
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
        yield order.destroy();
        res.status(204).json({ message: 'Order deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
});
exports.deleteOrder = deleteOrder;
