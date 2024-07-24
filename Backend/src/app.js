import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"
import userRouter from "./routes/user.routes.js" // routes import
import blogRouter from "./routes/blog.routes.js"


const app = express()

app.use(cors({
    origin: ["https://mern-todo-app-frontend-i78y.onrender.com","http://localhost:5173"],
    credentials: true,
  }))

app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({limit:"10mb" , extended: true }))
app.use(cookieParser())
app.use(express.static("public"))

//routes decleration
app.use("/api/v1/user",userRouter)
app.use("/api/v1/blog",blogRouter)

export {app}