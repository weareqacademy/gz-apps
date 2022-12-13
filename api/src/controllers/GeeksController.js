"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class GeeksController {
    async show(req, res) {
        const user_id = req.id;
        const geek = await connection_1.default('geeks')
            .join('users', 'geeks.user_id', '=', 'users.id')
            .select(['geeks.*', 'users.*'])
            .whereRaw(`users.id = ${user_id}`)
            .first();
        return res.json(geek);
    }
    async index(req, res) {
        const filters = req.query;
        const { page = 1 } = req.query;
        let work = filters.work;
        let desc = filters.desc;
        // Gohorse
        if (work == null)
            work = '';
        if (desc == null)
            desc = '';
        // Gohorse
        const geeks = await connection_1.default('geeks')
            .join('users', 'geeks.user_id', '=', 'users.id')
            .select(['geeks.*', 'users.*'])
            .whereRaw(`geeks.work like '%${work}%'`)
            .whereRaw(`geeks.desc like '%${desc}%'`)
            .limit(10)
            .offset((Number(page) - 1) * 10);
        const total = await connection_1.default('geeks').count('id as total');
        const Geeks = await Promise.all(geeks);
        return res.json({ Geeks, Count: total[0].total });
    }
    async update(req, res) {
        const { work, cost, desc } = req.body;
        const id = req.id;
        const trx = await connection_1.default.transaction();
        try {
            await trx('geeks').where('user_id', id).update({
                desc,
                work,
                cost,
            });
            const geeks = await trx('geeks').where('user_id', id);
            await trx.commit();
            return res.status(200).send();
        }
        catch (err) {
            console.log(err);
            await trx.rollback();
            return res
                .status(400)
                .json({ error: 'Unexpected error while updating class' });
        }
    }
    async store(req, res) {
        const { whatsapp, desc, work, cost } = req.body;
        const id = req.id;
        const trx = await connection_1.default.transaction();
        try {
            if (whatsapp) {
                await trx('users').where('id', id).update({
                    whatsapp
                });
            }
            await trx('geeks').where('user_id', id).del();
            await trx('geeks')
                .insert({
                user_id: id,
                desc,
                work,
                cost,
            })
                .returning('id');
            await trx.commit();
            return res.status(201).send();
        }
        catch (err) {
            console.log(err);
            await trx.rollback();
            return res
                .status(400)
                .json({ error: 'Unexpected error while creating new geek' });
        }
    }
}
exports.default = GeeksController;
