import { Router } from "express";
import  EventController  from "../handlers/event";



const eventRouter = Router();

eventRouter.post('/',EventController.createEvent);

export default eventRouter