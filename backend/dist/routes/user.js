"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/profile', auth_1.auth, user_1.getProfile);
router.put('/profile', auth_1.auth, user_1.updateProfile);
exports.default = router;
