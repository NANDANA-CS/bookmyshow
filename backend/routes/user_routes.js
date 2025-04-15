import express from "express"
import {  home, login, signup } from "../controllers/user_controller.js"
import auth from "../middlewares/auth.js"


const userRoutes = express.Router()

userRoutes.post("/signup",signup)
userRoutes.post("/login",login)
// userRoutes.post("/home",home)
// userRoutes.post("/loaduser",loaduser)

export default userRoutes