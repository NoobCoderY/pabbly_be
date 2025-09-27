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
exports.updateTaskPriority = exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getAllPendingTodos = exports.getALLCompletedTodos = exports.getAllTodo = exports.todoCreate = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const todoModel_1 = __importDefault(require("../model/todoModel"));
//**********************************Create Todo*********************************/
const todoCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, dueDate } = req.body;
        if (!title || !description || !dueDate) {
            return next(new errorHandler_1.default('please enter all details', 401));
        }
        const todo = yield todoModel_1.default.create({
            title: title,
            description: description,
            dueDate: dueDate,
            status: status,
            assignedTo: req.user.id,
        });
        res.status(200).json({
            message: 'todo successfully created',
            todo,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.todoCreate = todoCreate;
//**********************************Get All Todo*********************************/
const getAllTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 6;
        const totalTodos = yield todoModel_1.default.countDocuments({
            assignedTo: req.user.id,
        });
        const totalPages = Math.ceil(totalTodos / pageSize);
        const todos = yield todoModel_1.default
            .find({ assignedTo: req.user.id })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        res.status(200).json({
            message: 'success',
            todos,
            totalTodos,
            totalPages,
            currentPage: page,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 401));
    }
});
exports.getAllTodo = getAllTodo;
//**********************************Get All completed Todo*********************************/
const getALLCompletedTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 6;
        const totalTodos = yield todoModel_1.default.countDocuments({
            assignedTo: req.user.id,
            status: true, // Filter by true status
        });
        const totalPages = Math.ceil(totalTodos / pageSize);
        const todos = yield todoModel_1.default
            .find({ assignedTo: req.user.id, status: true }) // Filter by true status
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        res.status(200).json({
            message: 'success',
            todos,
            totalTodos,
            totalPages,
            currentPage: page,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 401));
    }
});
exports.getALLCompletedTodos = getALLCompletedTodos;
//**********************************Get All pending Todo*********************************/
const getAllPendingTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = 6;
        const totalTodos = yield todoModel_1.default.countDocuments({
            assignedTo: req.user.id,
            status: false,
        });
        const totalPages = Math.ceil(totalTodos / pageSize);
        const todos = yield todoModel_1.default
            .find({ assignedTo: req.user.id, status: false })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        res.status(200).json({
            message: 'success',
            todos,
            totalTodos,
            totalPages,
            currentPage: page,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error.message, 401));
    }
});
exports.getAllPendingTodos = getAllPendingTodos;
//**********************************Get Todo By Id*********************************/
const getTodoById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const todo = yield todoModel_1.default.findOne({ _id: id });
        if (!todo) {
            return next(new errorHandler_1.default('todo not found', 200));
        }
        res.status(200).json({
            message: 'success',
            todo,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.getTodoById = getTodoById;
//**********************************update Todo By *********************************/
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, description, status, dueDate } = req.body;
        const task = yield todoModel_1.default.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        if (task.assignedTo.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ error: 'You are not authorized to update this task' });
        }
        const todo = yield todoModel_1.default.findOneAndUpdate({ _id: id }, {
            title: title,
            description: description,
            dueDate: dueDate,
            status: status,
        }, {
            new: true,
        });
        res.status(200).json({
            message: 'success',
            todo,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.updateTodo = updateTodo;
//**********************************Delete By Id*********************************/
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const task = yield todoModel_1.default.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        if (task.assignedTo.toString() !== req.user.id) {
            return res
                .status(403)
                .json({ error: 'You are not authorized to delete this task' });
        }
        const todo = yield todoModel_1.default.findOneAndDelete({ _id: id });
        res.status(200).json({
            message: 'successfully deleted',
            todo,
        });
    }
    catch (error) {
        return next(new errorHandler_1.default(error, 401));
    }
});
exports.deleteTodo = deleteTodo;
const updateTaskPriority = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { priority } = req.body;
        const task = yield todoModel_1.default.findById(id);
        if (!task)
            return (next(new errorHandler_1.default('Task not found', 404)));
        task.priority = priority;
        yield task.save();
        res.status(200).json(task);
    }
    catch (err) {
        next(new errorHandler_1.default(err.message, 500));
    }
});
exports.updateTaskPriority = updateTaskPriority;
//# sourceMappingURL=todoController.js.map