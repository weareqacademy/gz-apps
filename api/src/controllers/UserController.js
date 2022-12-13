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
        const userExists = await connection_1.default('users').where('email', email);
        if (userExists.length !== 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const password_hash = await bcrypt_1.default.hash(password, 8);
        const trx = await connection_1.default.transaction();
        try {
            await trx('users').insert({
                name,
                email,
                password_hash,
                avatar: `https://avatars.dicebear.com/api/initials/${name}.svg`
            });
            await trx.commit();
            return res.status(201).send();
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
        const { name, email, whatsapp, avatar } = req.body;
        const id = req.id;
        const userExists = await connection_1.default('users').where('id', id);
        if (userExists.length === 0) {
            return res.status(400).json({ error: "User doesn't exists" });
        }
        const trx = await connection_1.default.transaction();
        try {
            let defaultAvatar;
            if (!avatar || avatar.length <= 0)
                defaultAvatar = `https://avatars.dicebear.com/api/initials/${name}.svg`;
            else
                defaultAvatar = avatar;
            if (!name && !email && whatsapp.length > 0 && !avatar) {
                await trx('users').where('id', id).update({
                    whatsapp,
                });
            }
            else {
                await trx('users').where('id', id).update({
                    name,
                    email,
                    whatsapp,
                    avatar: defaultAvatar,
                });
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
            return res.status(404).json({ error: "User doesn't exists" });
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
}
exports.default = UserController;
