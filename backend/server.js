 import express from "express"
 import cors from "cors"
import { connectDB } from "./config/db.js"
import gadgetRouter from "./routes/gadgetRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

import bodyParser from 'body-parser';




//app config
const app=express()
const port=  process.env.PORT || 4000;

app.use(bodyParser.json({ limit: '10mb' }));  // Adjust the limit according to your needs
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//middleware
app.use(express.json())
app.use(cors({
    origin: ["https://food-bite-api.vercel.app", 'http://localhost:5173'], // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // Allow cookies to be sent
  }))

// db connection
connectDB();
//api endpoint 
app.use("/api/gadget",gadgetRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
   res.send("API working")
})


app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})


