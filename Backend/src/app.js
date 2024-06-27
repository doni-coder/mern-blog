import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"
import userRouter from "./routes/user.routes.js" // routes import


const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static("public"))

//routes decleration
app.use("/api/v1/user",userRouter)

export {app}