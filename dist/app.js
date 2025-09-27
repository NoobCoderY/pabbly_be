"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//All imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleWare_1 = require("./middleware/errorMiddleWare");
const todoRouter_1 = __importDefault(require("./router/todoRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
//  env file import 
dotenv_1.default.config({
    path: "./config/config.env",
});
const app = (0, express_1.default)();
//**********************************Cross Origin*********************************/
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:3000", "https://full-stack-task-board-frontend.vercel.app"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use((0, cookie_parser_1.default)());
//**********************************REST API Routes**********************************/
app.use("/api/v1", todoRouter_1.default);
app.use("/api/v1", userRouter_1.default);
//**********************************error middleware**********************************/
app.use(errorMiddleWare_1.error);
exports.default = app;
//# sourceMappingURL=app.js.map