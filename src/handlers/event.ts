import { Request } from "express-serve-static-core";
import { Response } from "express-serve-static-core";
import { AppDataSource } from "../index";
import { CreateEventDto } from "../dtos/CreateEventDto";
import { Event } from "../entity/Event";


 class EventController {

async createEvent(request:Request,response:Response){
    try{

        const eventRepository=AppDataSource.getRepository(Event);
        const {title,date,location,availableTickets}=request.body;

        const event:CreateEventDto={
        title,
        date,
        location,
        availableTickets
        }

        const createdEvent= await eventRepository.save(event)

      response.status(201).json({
        status:201,
        data:createdEvent
      })

    }catch(error){
        response.status(500).send({error:error.message})
    }

}



}


export default new EventController()