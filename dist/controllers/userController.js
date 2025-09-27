"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const jwtHandler_1 = __importDefault(require("../utils/jwtHandler"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return next(new errorHandler_1.default('User already exists', 401));
        }
        const user = new userModel_1.default({ name, email, password });
        yield user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 401));
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user || !(yield user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = (0, jwtHandler_1.default)({ id: user._id });
        res.status(200).json({ token, user: { id: user._id, name: user.name } });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 401));
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map