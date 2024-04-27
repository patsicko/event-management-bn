import { Router } from "express";
import  UserController  from "../handlers/users";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";


const usersRouter = Router();

usersRouter.get('/',UserController.getUsers)

usersRouter.get('/:id',UserController.getUserById);
usersRouter.post('/',UserController.createUser);
usersRouter.patch('/:id',UserController.updateUser);
usersRouter.delete('/:id',authMiddleware,isAdmin,UserController.deleteUser);
usersRouter.post('/login',UserController.loginUser)


export default usersRouter