import express = require("express")

import { User } from "./entity/User"
import usersRouter from "./routes/users"
import { Request,Response } from "express-serve-static-core"
import { DataSource } from "typeorm";
import { seedAdmin } from "./handlers/seedAdmin";
const bodyParser = require('body-parser');

const app =express();
app.use(bodyParser.json());

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

   const PORT = process.env.port || 3000

   app.use('/api/users',usersRouter);

//    app.get('',(request:Request,response:Response)=>{
//     response.send(users)
//    })
 const startApp = async()=>{
    await seedAdmin();
    app.listen(PORT,()=>{
        console.log(`listening on http://localhost:${PORT}`)
       })
 }
   
 startApp()

}).catch(error => console.log(error))
