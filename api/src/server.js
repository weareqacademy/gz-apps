"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();

app.use(cors_1.default({
    origin: '*'
}));

app.use(express_1.default.json());
app.use(routes_1.default);
app.use(errorHandler);
app.listen(process.env.PORT || 3301);
function errorHandler(err, req, res, next) {
    res.status(err.statusCode).json({ error: err });
}
