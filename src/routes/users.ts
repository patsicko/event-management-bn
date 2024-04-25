import { Router } from "express";
import  UserController  from "../handlers/users";


const usersRouter = Router();

usersRouter.get('/',UserController.getUsers)

usersRouter.get('/:id',UserController.getUserById);
usersRouter.post('/',UserController.createUser);
usersRouter.patch('/:id',UserController.updateUser);


export default usersRouter