import { Router } from "express";
import  UserController  from "../handlers/users";
import { authMiddleware } from "../middlewares/authMiddleware";


const usersRouter = Router();

usersRouter.get('/',UserController.getUsers)

usersRouter.get('/:id',UserController.getUserById);
usersRouter.post('/',authMiddleware,UserController.createUser);
usersRouter.patch('/:id',UserController.updateUser);
usersRouter.delete('/:id',authMiddleware,UserController.deleteUser);
usersRouter.post('/login',UserController.loginUser)


export default usersRouter