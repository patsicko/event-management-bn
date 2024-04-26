import { Request, Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { AppDataSource } from "../index";
import { User } from "../entity/User";
import { Repository } from "typeorm";
import  * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import config from "../config/keys"
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

        userRepository = AppDataSource.getRepository(User);

         const {firstName,lastName,email,password} = request.body
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password,saltRound);
       
      const userDto:CreateUserDto={
            firstName,
            lastName,
            email,
            password:hashedPassword
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


   async deleteUser(request:Request<{id:number}>,response:Response){
    
    try{
        userRepository= AppDataSource.getRepository(User);
     const {id} = request.params
      const user= await userRepository.findOneBy({id});

      console.log("user to delete",user)

      if(!user){
        response.send("user not found");
        return
      }
      await userRepository.remove(user);

      response.status(204).json({
        status:204,
        message:'user deleted successfully',
        data:{}
      })

    }catch(error){
        response.status(500).send({error:error.message})
    }

    }



    async loginUser(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            
            userRepository= AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { email } });
            if (!user) {
                return response.status(400).json({ message: "Invalid credentials" });
            }

            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return response.status(400).json({ message: "Invalid credentials" });
            }

          
            const token = jwt.sign({ user:user}, config.jwtSecret, { expiresIn: "1h" });

            response.status(200).json({
                message: "Login successful",
                token
            });
        } catch (error) {
            response.status(500).send({ error: error.message });
        }
    }
}

export default new UserController();
