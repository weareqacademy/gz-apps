"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
class SessionController {
    async store(req, res) {
        const { email, password } = req.body;
        const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!email || email.length <= 0)
            return res.status(400).json({ error: 'Required email' });
        else if (!regexEmail.test(email))
            return res.status(400).json({ error: 'Incorrect email' });
        if (!password || password.length <= 0)
            return res.status(400).json({ error: 'Required pass' });
        const userExists = await connection_1.default('users')
            .where('email', '=', email)
            .select(['users.*']);
        if (userExists.length === 0) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!(await bcrypt_1.default.compare(password, userExists[0].password_hash))) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id } = userExists[0];
        return res.json({
            user: userExists[0],
            token: jsonwebtoken_1.default.sign({ id }, auth_1.default.secret, {
                expiresIn: auth_1.default.expiresIn,
            }),
            expires_in: auth_1.default.expiresIn
        });
    }
}
exports.default = SessionController;
