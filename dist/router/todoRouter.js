"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/create", auth_1.authenticate, todoController_1.todoCreate);
router.get("/getalltodos", auth_1.authenticate, todoController_1.getAllTodo);
router.get("/getallcompletedtodos", auth_1.authenticate, todoController_1.getALLCompletedTodos);
router.get("/getallpendingtodos", auth_1.authenticate, todoController_1.getAllPendingTodos);
router.get("/gettodo/:id", auth_1.authenticate, todoController_1.getTodoById);
router.put("/updatetodo/:id", auth_1.authenticate, todoController_1.updateTodo);
router.delete("/deletetodo/:id", auth_1.authenticate, todoController_1.deleteTodo);
router.put("/updatetaskpriority/:id", auth_1.authenticate, todoController_1.updateTaskPriority);
exports.default = router;
//# sourceMappingURL=todoRouter.js.map