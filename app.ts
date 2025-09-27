//All imports
import express from "express";
import dotenv from "dotenv";
import { error } from "./middleware/errorMiddleWare";
import todoRouter from "./router/todoRouter"
import cookieParser from "cookie-parser"
import cors from "cors";
import userRouter from './router/userRouter'

//  env file import 

dotenv.config({
    path: "./config/config.env",
  });

const app = express();

 //**********************************Cross Origin*********************************/

 app.use(cors({
    credentials: true,
    origin:["http://localhost:3000","https://full-stack-task-board-frontend.vercel.app"],
  }))
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }))
  
app.use(cookieParser())
  


  //**********************************REST API Routes**********************************/

app.use("/api/v1", todoRouter)
app.use("/api/v1", userRouter)

 //**********************************error middleware**********************************/

  app.use(error)



export default app;
