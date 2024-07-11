import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect("mongodb+srv://hridita:<password>@foodbite.en9kbch.mongodb.net/").then(()=>console.log("DB connected"));
}