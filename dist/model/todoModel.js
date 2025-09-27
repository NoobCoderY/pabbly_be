"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TodoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    assignedTo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'low',
    },
});
exports.default = mongoose_1.default.model('todo', TodoSchema);
//# sourceMappingURL=todoModel.js.map