import express from "express"
import { deleteTodo, getAllTodo, getTodoById, todoCreate, updateTodo ,getALLCompletedTodos,getAllPendingTodos,updateTaskPriority} from "../controllers/todoController";
import { authenticate } from "../middleware/auth";

const router = express.Router();


router.post("/create", authenticate, todoCreate)
router.get("/getalltodos", authenticate, getAllTodo)
router.get("/getallcompletedtodos", authenticate, getALLCompletedTodos)
router.get("/getallpendingtodos", authenticate, getAllPendingTodos)
router.get("/gettodo/:id",  authenticate, getTodoById)
router.put("/updatetodo/:id", authenticate, updateTodo)
router.delete("/deletetodo/:id", authenticate, deleteTodo)
router.put("/updatetaskpriority/:id", authenticate, updateTaskPriority)

export  default router