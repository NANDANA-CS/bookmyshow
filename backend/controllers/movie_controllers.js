import e from "cors";
import movieSchema from "../models/bmsmodel.js"
import userSchema from "../models/usermodels.js"



export const add =async (req,res) => {
    console.log(req.body.name);
    
        try {
            const { name, screen, language, duration, certificate, category, relsdate, poster, banner } = req.body
            console.log("destruct", { name, screen, language, duration, certificate, category, relsdate });
            console.log("okkk", req.body);
    
            if (!name || !screen || !language || !duration || !certificate || !category || !relsdate || !poster || !banner) {
                return res.status(404).send({ error: "please fill all fields" })
            }
            const data = await movieSchema.create({ name, screen, language, duration, certificate, category, relsdate, poster, banner })
            res.status(201).send(data)
        } catch (error) {
            res.status(500).send({ error })
        }
}


// export const load=async  (req,res) => {

//     console.log(req.user);
//     const userdata=await userSchema.findOne({_id:req.user})
//     res.status(200).send({email:userdata.email})
//     console.log("inside load movie");
    

//     try {
//             console.log("inside load");
            
//             const data = await movieSchema.find()
//             res.status(200).send(data)
//         } catch (error) {
//             res.status(500).send({ error })
//         }
// }


export const load = async (req, res) => {
    try {
        console.log("Inside load movie");
        console.log(req.user);
        

        const userdata = await userSchema.findById(req.user)
        const movies = await movieSchema.find()

        res.status(200).send({ userdata, data: movies })
    } catch (error) {
        console.error("Load error:", error);
        res.status(500).send({ error })
    }
}



export const preview=async (req,res) => {
       try {
            const movieId = req.params.id
            const data = await movieSchema.findById(movieId)
            res.status(200).send(JSON.stringify(data))
    
        }
        catch (err) {
            res.status(500).json({ error: err })
        }
}

export const moviedelete =async (req,res) => {
     try {
            await movieSchema.findByIdAndDelete(req.params.id)
            res.status(200).send({ message: "Movie deleted successfully" })
        } catch (error) {
            res.status(500).send({ error })
        }
}

export const getmovie=async (req,res) => {
     const {id}=req.params
        try {
            console.log("inside load");
            const data = await movieSchema.find({_id:id})
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send({ error })
        }
}