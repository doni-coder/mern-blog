import dotenv from "dotenv"
dotenv.config({path:"./.env"})
import { connectDB } from "./src/db/index.js";
import { app } from "./src/app.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 40001 , ()=>{
        console.log(`server is listining on port ${process.env.port}`);
    })
})
.catch(()=>{
    console.log("mongodb connection error");
})