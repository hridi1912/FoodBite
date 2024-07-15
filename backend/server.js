 import express from "express"
 import cors from "cors"
import { connectDB } from "./config/db.js"
import gadgetRouter from "./routes/gadgetRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import http from "http-server";

//app config
const app=express()
const port=4000

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();
//api endpoint 
app.use("/api/gadget",gadgetRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
   res.send("API working")
})

const server = http.createServer(app);
server.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})


