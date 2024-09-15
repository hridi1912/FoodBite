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

app.use(bodyParser.json({ limit: '500mb' }));  // Adjust the limit according to your needs
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

//middleware
app.use(express.json())
app.use(cors({
    origin: ['https://food-bite-odq9.vercel.app', 'http://localhost:5173'], // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // Allow cookies to be sent
  }))

// db connection
//connectDB();
connectDB().catch(error => {
  console.error("DB Connection Error: ", error);
  process.exit(1);
});
//api endpoint 
app.use("/api/gadget",gadgetRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
   res.send("API working")
})
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke in middleware!');
});

const server = http.createServer(app);

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

export default app
