import { Router } from "express";
import usersRouter from "./users";
import eventRouter from "./events";


const mainRouter=Router();

mainRouter.use('/users',usersRouter);
mainRouter.use('/events',eventRouter);


export default mainRouter
