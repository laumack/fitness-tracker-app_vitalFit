"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_router_1 = __importDefault(require("./routes/api.router"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./error-handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", api_router_1.default);
app.use(error_handler_1.customErr);
app.use(error_handler_1.errLog);
exports.default = app;
