"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    async store(req, res) {
        const { name, email, password } = req.body;
        if (!name || name.length <= 0)
            return res.status(400).json({ error: 'Required name' });
        const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!email || email.length <= 0)
            return res.status(400).json({ error: 'Required email' });
        else if (!regexEmail.test(email))
            return res.status(400).json({ error: 'Incorrect email' });
        if (!password || password.length <= 0)
            return res.status(400).json({ error: 'Required pass' });
        const userExists = await connection_1.default('users').where('email', email);
        if (userExists.length !== 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const password_hash = await bcrypt_1.default.hash(password, 8);
        const trx = await connection_1.default.transaction();
        try {
            const [user] = await trx('users').insert({
                name,
                email,
                password_hash
            }).returning(['id']);
            await trx.commit();
            return res.status(201).json(user);
        }
        catch (err) {
            console.log(err);
            await trx.rollback();
            return res
                .status(400)
                .json({ error: 'Unexpected error while creating new user' });
        }
    }
    async update(req, res) {
        const { name, email, whatsapp, avatar, is_geek } = req.body;
        const id = req.id;
        if (!name || name.length <= 0)
            return res.status(400).json({ error: 'Required name' });
        const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!email || email.length <= 0)
            return res.status(400).json({ error: 'Required email' });
        else if (!regexEmail.test(email))
            return res.status(400).json({ error: 'Incorrect email' });
        const userExists = await connection_1.default('users').where('id', id);
        if (userExists.length === 0) {
            return res.status(400).json({ error: "User doesn't exists" });
        }
        const trx = await connection_1.default.transaction();
        try {
            if (!name && !email && whatsapp.length > 0 && !avatar) {
                await trx('users').where('id', id).update({
                    whatsapp,
                });
            }
            else {
                const payload = req.body;
                await trx('users').where('id', id).update(payload);
            }
            await trx.commit();
            return res.status(200).send();
        }
        catch (err) {
            console.log(err);
            await trx.rollback();
            return res
                .status(400)
                .json({ error: 'Unexpected error while updating user' });
        }
    }
    async show(req, res) {
        const id = req.id;
        let userExists = await connection_1.default('users')
            .where('users.id', id)
            .select(['users.*']);
        if (userExists.length === 0) {
            return res.status(404).end();
        }
        const haveGeeks = await connection_1.default('geeks').where('user_id', id);
        let user = userExists[0];
        if (haveGeeks.length > 0) {
            userExists = await connection_1.default('users')
                .where('users.id', id)
                .join('geeks', 'geeks.user_id', 'users.id');
            user = userExists[0];
        }
        return res.json(user);
    }
    async remove(req, res) {
        const id = req.id;
        const trx = await connection_1.default.transaction();
        try {
            let userExists = await connection_1.default('users')
                .where('users.id', id)
                .select(['users.*']);
            if (userExists.length === 0) {
                return res.status(204).end();
            }
            let user = userExists[0];
            await trx('geeks').where('user_id', user.id).del();
            await trx('users').where('id', user.id).del();
            await trx.commit();
            return res.status(204).end();
        }
        catch (err) {
            console.log(err);
            await trx.rollback();
            return res
                .status(400)
                .json({ error: 'Unexpected error while removing user data' });
        }
    }
}
exports.default = UserController;
