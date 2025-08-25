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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const index_1 = __importDefault(require("../models/index"));
const sequelize_1 = require("sequelize");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, search, sortBy, sortOrder, page = 1, limit = 10 } = req.query;
        const where = {};
        if (category) {
            where.categoryId = category;
        }
        if (search) {
            where.name = { [sequelize_1.Op.like]: `%${search}%` };
        }
        const order = [];
        if (sortBy) {
            order.push([sortBy, sortOrder || 'ASC']);
        }
        const products = yield product_1.default.findAndCountAll({
            where,
            order,
            offset: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
            include: { model: index_1.default.Category, as: 'category' },
        });
        res.status(200).json({
            data: products.rows,
            totalPages: Math.ceil(products.count / Number(limit)),
            currentPage: Number(page),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findByPk(id, { include: { model: index_1.default.Category, as: 'category' } });
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { categoryId } = _a, productData = __rest(_a, ["categoryId"]);
        const product = yield product_1.default.create(Object.assign(Object.assign({}, productData), { categoryId }));
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { categoryId } = _a, productData = __rest(_a, ["categoryId"]);
        const [updated] = yield product_1.default.update(Object.assign(Object.assign({}, productData), { categoryId }), { where: { id } });
        if (updated) {
            const updatedProduct = yield product_1.default.findByPk(id, { include: { model: index_1.default.Category, as: 'category' } });
            res.status(200).json(updatedProduct);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield product_1.default.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.deleteProduct = deleteProduct;
