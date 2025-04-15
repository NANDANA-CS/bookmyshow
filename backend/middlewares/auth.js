import jwt from 'jsonwebtoken'
const {verify}=jwt

export default async function auth(req,res,next) {
    console.log("auth middleware");
    const key=req.headers.authorization
    if (!key) {
        return res.status(403).send("unauthorized access:no token provided")
    }
        
    const token =key.split(" ")[1]
    try {
        const auth=await verify(token,process.env.JWT_KEY)
        console.log(auth);  
        req.user=auth.id
        next() 
    } catch (error) {
        console.log(error);
        return res.status(403).send("unauthorized access:invalid token or expired token")
    }
    
}