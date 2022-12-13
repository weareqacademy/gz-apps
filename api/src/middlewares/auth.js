"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
const auth_1 = __importDefault(require("../config/auth"));
exports.default = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Not authorized' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decode = await util_1.promisify(jsonwebtoken_1.default.verify)(token, auth_1.default.secret);
        req.id = decode.id;
    }
    catch (err) {
        return res.status(401).json({ error: 'Expired or incorrect token' });
    }
    return next();
};
