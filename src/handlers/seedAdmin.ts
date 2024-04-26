import * as bcrypt from "bcrypt"
import { AppDataSource } from "../index"
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { User } from "../entity/User"


export const seedAdmin =async()=>{

    const userRepository = AppDataSource.getRepository(User);

    const existingAdmin = await userRepository.findOne({where:{role:'admin'}});

    if(!existingAdmin){

        const saltRound= 10;
        const hashedPassword= await bcrypt.hash('admin',saltRound)

        const adminDto:CreateUserDto= {
            firstName:'Admin',
            lastName:'Admin',
            email:'admin@gmail.com',
            password:hashedPassword,
            role:'admin'
        }

       const admin= await userRepository.save(adminDto);
       return admin
    }
   
    return existingAdmin
}