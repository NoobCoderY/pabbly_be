# FullStackTaskBoardBackend

## Deployed Links
- Frontend: [https://full-stack-task-board-frontend.vercel.app/](https://full-stack-task-board-frontend.vercel.app/)
- Backend: [https://taskdashboard2.onrender.com](https://taskdashboard2.onrender.com)

## Getting Started

### Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/NoobCoderY/Magnet_brains_be.git
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the [config](http://_vscodecontentref_/1) directory and add the following environment variables:
    ```env
    MONGO_URI
    PORT=5000
    JWT_SECRET_KEY
    JWT_EXPIRES_IN
    ```

### Running the Project

1. Build the project:
    ```sh
    npm run build
    ```

2. Start the project:
    ```sh
    npm start
    ```

3. For development mode with auto-restart on changes:
    ```sh
    npm run dev
    ```

### API Endpoints

- User Registration: `POST /api/v1/register`
- User Login: `POST /api/v1/login`
- Create Todo: `POST /api/v1/create`
- Get All Todos: `GET /api/v1/getalltodos`
- Get Completed Todos: `GET /api/v1/getallcompletedtodos`
- Get Pending Todos: `GET /api/v1/getallpendingtodos`
- Get Todo by ID: `GET /api/v1/gettodo/:id`
- Update Todo: `PUT /api/v1/updatetodo/:id`
- Delete Todo: `DELETE /api/v1/deletetodo/:id`
- Update Task Priority: `PUT /api/v1/updatetaskpriority/:id`

### Middleware

- Authentication: `middleware/auth.ts`
- Error Handling: `middleware/errorMiddleWare.ts`

### Utilities

- Error Handler: `utils/errorHandler.ts`
- JWT Handler: `utils/jwtHandler.ts`

### Models

- User Model: `model/userModel.ts`
- Todo Model: `model/todoModel.ts`

### Controllers

- User Controller: `controllers/userController.ts`
- Todo Controller: `controllers/todoController.ts`

### Routers

- User Router: `router/userRouter.ts`
- Todo Router: `router/todoRouter.ts`