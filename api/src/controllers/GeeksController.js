"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class GeeksController {
    async index(req, res) {
        const filters = req.query;
        const { page = 1 } = req.query;
        let printer_repair = filters.printer_repair;
        let desc = filters.desc;
        // Gohorse
        if (desc == null)
            desc = '';
        if (printer_repair == null)
            printer_repair = '';
        // Gohorse
        const geeks = await connection_1.default('geeks')
            .join('users', 'geeks.user_id', '=', 'users.id')
            .select(['geeks.*', 'users.*'])
            .whereRaw("LOWER (geeks.desc) LIKE '%' || LOWER (?) || '%'", desc)
            .whereRaw("LOWER (geeks.printer_repair) LIKE '%' || LOWER (?) || '%'", printer_repair)
            .limit(10)
            .offset((Number(page) - 1) * 10);
        const total = await connection_1.default('geeks').count('id as total');
        const Geeks = await Promise.all(geeks);
        return res.json({ Geeks, Count: total[0].total });
    }
    async update(req, res) {
        const { work, cost, printer_repair, desc } = req.body;
        const id = req.id;
        const trx = await connection_1.default.transaction();
        try {
            await trx('geeks').where('user_id', id).update({
                desc,
                printer_repair,
                work,
                cost,
            });
            await trx('geeks').where('user_id', id);
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
        const { whatsapp, desc, printer_repair, work, cost } = req.body;
        const id = req.id;
        let validations = [];
        if (!whatsapp || whatsapp.length <= 0)
            validations.push('Whatsapp is required');
        if (!desc || desc.length <= 0)
            validations.push('Description is required');
        if (!printer_repair || printer_repair.length <= 0)
            validations.push('Printer repair is required.');
        if (!["Sim", "Não"].includes(printer_repair))
            validations.push('Incorrect option for printer repair');
        if (!work || work.length <= 0)
            validations.push('Work is required');
        if (!cost || cost.length <= 0)
            validations.push('Cost is required');
        if (validations.length > 0)
            return res.status(400).json({ errors: validations });
        const trx = await connection_1.default.transaction();
        try {
            await trx('users').where('id', id).update({
                is_geek: true,
                whatsapp
            });
            await trx('geeks').where('user_id', id).del();
            const user = await trx('users').where('id', id).first();
            await trx('geeks')
                .insert({
                user_id: id,
                desc,
                printer_repair,
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
    async remove(req, res) {
        const id = req.id;
        const trx = await connection_1.default.transaction();
        try {
            await trx('geeks').where('user_id', id).del();
            await trx('users').where('id', id).update({ is_geek: false });
            await trx.commit();
            return res.status(204).send();
        }
        catch (err) {
            console.log(err);
            await trx.rollback();
            return res
                .status(400)
                .json({ error: 'Unexpected error while removing geek profile' });
        }
    }
}
exports.default = GeeksController;
