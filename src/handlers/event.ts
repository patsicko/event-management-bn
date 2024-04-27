import { Request } from "express-serve-static-core";
import { Response } from "express-serve-static-core";
import { AppDataSource } from "../index";
import { CreateEventDto } from "../dtos/CreateEventDto";
import { Event } from "../entity/Event";


 class EventController {

async createEvent(request:Request<{id:number}>,response:Response){
    try{

        const eventRepository=AppDataSource.getRepository(Event);
        const {title,date,location,availableTickets}=request.body;
   console.log("body",request.body)
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


async getEvent(request:Request<{id:number}>,response:Response){
  try{
    const eventRepository=AppDataSource.getRepository(Event);

   const events= await eventRepository.find();

   response.status(200).json({
    status:200,
    data:events
   })

  }catch(error){
    response.status(500).send({error:error.message})
}

}

async getEventById(request:Request<{id:number}>,response:Response){
  try{
    const eventRepository=AppDataSource.getRepository(Event);

    const {id} = request.params

   const event= await eventRepository.findOne({where:{id}});

   if(!event){
    response.status(404).json({
      status:404,
      message:'Event not found'
    })
   }

   response.status(200).json({
    status:200,
    data:event
   })

  }catch(error){
    response.status(500).send({error:error.message})
}

}



}


export default new EventController()