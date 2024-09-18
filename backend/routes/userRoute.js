import express from "express";
import {  loginUser,registerUser,getUserInfo,updateUserInfo,changePassword,refreshAccessToken } from "../controllers/userController.js";

const userRouter =express.Router()
userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/profile",getUserInfo)
userRouter.put("/update",updateUserInfo)
userRouter.put("/change-password",changePassword)
userRouter.post("/refreshToken",refreshAccessToken)
export default userRouter;