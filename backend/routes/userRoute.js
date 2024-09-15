import express from "express";
import {  loginUser,registerUser } from "../controllers/userController.js";

const userRouter =express.Router()
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
// userRouter.get("/profile",getUserInfo)
// userRouter.put("/update",updateUserInfo)
// userRouter.put("/change-password",changePassword)
export default userRouter;