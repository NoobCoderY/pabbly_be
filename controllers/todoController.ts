import express, { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';
import todoModel from '../model/todoModel';

//**********************************Create Todo*********************************/

export const todoCreate = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return next(new ErrorHandler('please enter all details', 401));
    }

    const todo = await todoModel.create({
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
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};

//**********************************Get All Todo*********************************/

export const getAllTodo = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 6;

    const totalTodos = await todoModel.countDocuments({
      assignedTo: req.user.id,
    });
   
    
    const totalPages = Math.ceil(totalTodos / pageSize);

    const todos = await todoModel
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
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 401));
  }
};

//**********************************Get All completed Todo*********************************/

export const getALLCompletedTodos = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 6;

    const totalTodos = await todoModel.countDocuments({
      assignedTo: req.user.id,
      status: true, // Filter by true status
    });
    const totalPages = Math.ceil(totalTodos / pageSize);

    const todos = await todoModel
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
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 401));
  }
};

//**********************************Get All pending Todo*********************************/

export const getAllPendingTodos = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 6;

    const totalTodos = await todoModel.countDocuments({
      assignedTo: req.user.id,
      status: false, 
    });
    
    
    const totalPages = Math.ceil(totalTodos / pageSize);

    const todos = await todoModel
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
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 401));
  }
};


//**********************************Get Todo By Id*********************************/

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    console.log(id);
    
    const todo = await todoModel.findOne({ _id: id });
    if (!todo) {
      return next(new ErrorHandler('todo not found', 200));
    }

    res.status(200).json({
      message: 'success',
      todo,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};

//**********************************update Todo By *********************************/

export const updateTodo = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { title, description, status, dueDate } = req.body;
    const task = await todoModel.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: 'You are not authorized to update this task' });
    }
    const todo = await todoModel.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        description: description,
        dueDate: dueDate,
        status: status,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: 'success',
      todo,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};

//**********************************Delete By Id*********************************/

export const deleteTodo = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const task = await todoModel.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.assignedTo.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: 'You are not authorized to delete this task' });
    }
    const todo = await todoModel.findOneAndDelete({ _id: id });
    res.status(200).json({
      message: 'successfully deleted',
      todo,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error, 401));
  }
};


export const updateTaskPriority = async (req: Request, res:Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;
    const task = await todoModel.findById(id);
    if (!task) return (next(new ErrorHandler('Task not found', 404)));

    task.priority = priority;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
