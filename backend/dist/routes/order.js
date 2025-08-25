"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/cart', auth_1.auth, order_1.getCart);
router.post('/cart/add', auth_1.auth, order_1.addToCart);
router.route('/')
    .get(auth_1.auth, auth_1.isAdmin, order_1.getAllOrders) // Only admin can get all orders
    .post(auth_1.auth, order_1.createOrder); // Any logged-in user can create an order
router.route('/:id')
    .get(auth_1.auth, order_1.getOrderById) // User can get their own order, admin can get any
    .put(auth_1.auth, auth_1.isAdmin, order_1.updateOrder) // Only admin can update any order
    .delete(auth_1.auth, auth_1.isAdmin); // Only admin can delete orders
exports.default = router;
