import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://hridita:secret123@foodbite.en9kbch.mongodb.net/FoodBite').then(()=>console.log("DB connected"));
}