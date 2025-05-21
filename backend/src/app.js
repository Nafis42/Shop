import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors())
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))

import userRouter from "./routes/user.routes.js"
import categoryRouter from "./routes/category.routes.js"
import productRouter from "./routes/products.routes.js"
// import productRouter from "./routes/products.routes.js"

app.use("/api/v1/users",userRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/products",productRouter);

export {app}
