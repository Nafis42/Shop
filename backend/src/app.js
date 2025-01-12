import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors())
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users",userRouter);

export {app}
