import mongoose from "mongoose";
const movieSchema=new mongoose.Schema({
    name:{type:String,required:true},
    screen:{type:Array,required:true},
    language:{type:Array,required:true},
    duration:{type:String,required:true},
    certificate:{type:String,required:true},
    category:{type:Array,required:true},
    relsdate:{type:Date,required:true},
    poster:{type:String,required:true},
    banner:{type:String,required:true},
})
export default mongoose.model.movies||mongoose.model("movie",movieSchema)
