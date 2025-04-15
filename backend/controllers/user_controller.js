import userSchema from "../models/usermodels.js"
import bcrypt from "bcrypt"


// export const adduser = async (req, res) => {
//     try {
//         const { username, email, phone, password } = req.body
//         console.log(req.body);
        

//         console.log("add user in controller");


//         if (!(username && email && phone && password)) {
//             return res.status(404).send({ error: "please fill all fields" })
//         }
//         const data = await userSchema.create({ username, email, phone, password })
//         res.status(201).send(data)
//     } catch (error) {
//         console.log(error);

//         res.status(500).send(error)
//     }
// }


export const signup =async (req,res) =>{
    const {username,email,phone,password}=req.body
    if(!(username&&email&&phone&&password))
        return res.status(400).send("enter full details")
    // bcrypt.hash(password,10).then(async (hashedpwd) => {
    //     console.log(req.body);
    //     console.log(hashedpwd);
    //     const data=await userSchema.create({username,email,phone,password:hashedpwd})
    //     res.status(201).send(data)
    // })


    try {
      // Check if user already exists
      const existingUser = await userSchema.findOne({ email })
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" })
      }

      // Hash password and save new user
      const hashedpwd = await bcrypt.hash(password, 10).then(async(hashedpwd)=>{
        console.log(req.body);
        console.log(hashedpwd);
        const data = await userSchema.create({username,email,phone,password: hashedpwd})
        res.status(201).json(data)
      })
      
  } catch (error) {
      console.error("Signup Error:", error)
      res.status(500).json({ message: "Server error during signup" })
  }
}



// export const loaduser = async (req, res) => {
//     try {
//         const { username, password} = req.body
//         const data =await userSchema.findOne({username})

       
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error)
//     }
// }


export async function login(req,res){
    const {email,password}=req.body
    console.log(req.body);
    try {
      const userExist=await userSchema.findOne({email})
      if (!userExist) {
        return res.status(400).json({message:"user not found"})
      }  

      const isPasswordMatch=await bcrypt.compare(password,userExist.password)
      console.log(isPasswordMatch);
      if (!isPasswordMatch) {
        return res.status(400).json({message:"invalid password"})
      }
      res.status(200).json({message:"Login Successfull",user:userExist})
      console.log(userExist);
    }catch(e){
      
       return res.status(500).json({message:"server error"})
    }
}
