import express = require("express")

import { User } from "./entity/User"
import usersRouter from "./routes/users"
import { Request,Response } from "express-serve-static-core"
import { DataSource } from "typeorm";
import { seedAdmin } from "./handlers/seedAdmin";
import { Booking } from "./entity/Booking";
import {Event} from './entity/Event'
import mainRouter from "./routes/routers";
const bodyParser = require('body-parser');
import dotenv = require('dotenv');
 dotenv.config()
const app =express();
app.use(bodyParser.json());

console.log("env data",process.env.DB_USER)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User,Event,Booking],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(async () => {

   

   const PORT = process.env.PORT || 3000

   app.use('/api',mainRouter);
   


 const startApp = async()=>{
    await seedAdmin();
    app.listen(PORT,()=>{
        console.log(`listening on http://localhost:${PORT}`)
       })
 }
   
 startApp()

}).catch(error => console.log(error))
