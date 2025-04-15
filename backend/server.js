import express from "express";
import connection from "./connection.js";
import movieSchema from "./models/bmsmodel.js"
import path from "path"
import url from "url"
import cors from 'cors'
import movieRoutes from "./routes/movie_routes.js";
import userRoutes from "./routes/user_routes.js";
import env from "dotenv"
env.config()



const app = express()

// get paths
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontend = path.join(__dirname, "..", "frontend")




app.use(cors())

app.use(express.json({ limit: "20mb" }))
app.use(express.urlencoded({ extended: true }))


app.use("/api/movie",movieRoutes)
app.use("/api/sign",userRoutes)



// app.get('/preview/:id', async (req, res) => {

//     try {
//         const movieId = req.params.id
//         const data = await movieSchema.findById(movieId)
//         res.status(200).send(JSON.stringify(data))

//     }
//     catch (err) {
//         res.status(500).json({ error: err })
//     }
// })



// app.get("/delete/:id", async (req, res) => {
//     try {
//         await movieSchema.findByIdAndDelete(req.params.id)
//         res.status(200).send({ message: "Movie deleted successfully" })
//     } catch (error) {
//         res.status(500).send({ error })
//     }
// })



app.get("/getmovie/:id", async (req, res) => {
    const {id}=req.params
    try {
        console.log("inside load");
        const data = await movieSchema.find({_id:id})
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({ error })
    }
})

app.post("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name,screen,language,duration,certificate,category,relsdate } = req.body;

        const data = await movieSchema.findByIdAndUpdate(id, {name,screen,language,duration,certificate,category,relsdate}, { new: true });

        if (!data) {
            return res.status(500).json({ error: "Failed to update task" });
        }

        console.log("Update Successful:", data);
        res.status(200).json(data); 
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ error: err.message });
    }
});


app.get("/signup", (req, res) => {
    res.status(200).sendFile(path.join(frontend, "signup.html"))
})
app.get("/signin", (req, res) => {
    res.status(200).sendFile(path.join(frontend, "login.html"))
})

app.use("/api/sign", userRoutes)


app.use(express.static(frontend))
const port=8000
connection().then(() => {
    app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}`);
    })
}).catch((err) => {
    console.log(err)
})

