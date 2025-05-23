import express from "express"
import { add, getmovie, load, moviedelete, preview } from "../controllers/movie_controllers.js"
import auth from "../middlewares/auth.js"


const movieRoutes=express.Router()

movieRoutes.post("/add",add)
movieRoutes.get("/load",auth,load)
movieRoutes.get("/preview/:id",preview)
movieRoutes.get("/delete/:id",moviedelete)
movieRoutes.get("/getmovie:id",getmovie)

export default movieRoutes

