import { Router } from "express";
import  EventController  from "../handlers/event";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";



const eventRouter = Router();

eventRouter.post('/create',authMiddleware,isAdmin,EventController.createEvent);
eventRouter.get('/all',EventController.getEvent);
eventRouter.get('/:id',EventController.getEventById)

export default eventRouter