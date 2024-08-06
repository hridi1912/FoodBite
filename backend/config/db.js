/*import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect("mongodb+srv://hridita:secret123@foodbite.en9kbch.mongodb.net/FoodBite?retryWrites=true&w=majority&appName=FoodBite").then(()=>console.log("DB connected"));
}*/
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected"));

    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    //process.exit(1);
  }
};


