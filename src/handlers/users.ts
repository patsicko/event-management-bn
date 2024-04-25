import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { AppDataSource } from "../index";
import { User } from "../entity/User";
import { Repository } from "typeorm";
import { UpdateUserDto } from "../dtos/UpdateUser.tdo";

let userRepository:any

class UserController {

    async getUsers(request: Request, response: Response) {
        try {

            userRepository = AppDataSource.getRepository(User)
            const users = await userRepository.find();
            response.status(200).json({
                status:'success',
                data:users
            });
        } catch (error) {
            response.status(500).send({ error: error.message });
        }
    }

    async getUserById(request: Request<{id:number}>, response: Response){

        try{

            const {id} = request.params;
            userRepository = AppDataSource.getRepository(User)
    
             const user= await userRepository.find({where:{id}})
    

             response.status(200).json({
                status:200,
                data:user
             })

        }catch(error){
            response.status(500).send({ error: error.message });
        }  
 
    }

   async createUser(request: Request<{}, {}, CreateUserDto>, response: Response){

    try{
        userRepository = AppDataSource.getRepository(User)

        console.log("post request.body",request.body)
      const userDto:CreateUserDto={
            firstName:"MANIBAHO",
            lastName: "Patrick",
            email:"patsicko@gmail.com",
            password:"musanze"
        }

        const user = await userRepository.save(userDto);
        response.status(201).json({
            status:201,
            data:user
        })
    }catch(error){
        response.status(500).send({ error: error.message });
    }
        
    }


      async updateUser(request: Request<{id:number}, {}, UpdateUserDto>, response: Response){

        console.log("req.body",request.body)
    
        try{
            userRepository= AppDataSource.getRepository(User);
        const {id} = request.params;

        const existingUser = await userRepository.findOneBy({id});


       console.log("existing user",existingUser)

        if(!existingUser){
            response.status(404).json({
                status:404,
                message:"user not found"
            })
        }

        const {firstName,lastName,email}=request.body || {};


        console.log(`"fname":${firstName} lastname:${lastName} email:${email}`)

        

        existingUser.firstName=firstName
        existingUser.lastName=lastName
        existingUser.email = email

        const updatedUser = await userRepository.save(existingUser);

        response.status(201).json({
            status:201,
            data:{
                updatedUser:updatedUser
            }
        })

        }catch(error){
            response.status(500).send({error:error.message})
        }

    }
}

export default new UserController();
