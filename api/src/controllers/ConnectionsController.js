"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ConnectionsController {
    async index(req, res) {
        const totalConnections = await connection_1.default('connections').count('* as total');
        const { total } = totalConnections[0];
        return res.json({ total });
    }
    async store(req, res) {
        const { user_id } = req.body;
        await connection_1.default('connections').insert({
            user_id,
        });
        return res.status(201).send();
    }
}
exports.default = ConnectionsController;
