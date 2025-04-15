import express from "express"
import {  login, signup } from "../controllers/user_controller.js"


const userRoutes = express.Router()

userRoutes.post("/signup",signup)
userRoutes.post("/login",login)
// userRoutes.post("/loaduser",loaduser)

export default userRoutes