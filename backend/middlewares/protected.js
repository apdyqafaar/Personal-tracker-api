import jwt from 'jsonwebtoken' 
import dotenv from 'dotenv'
import User from '../models/userSchema.js'
dotenv.config()
export const protecte=async(req, res, next)=>{
  
    const token=req.headers.authorization?.split(' ')[1]
      console.log(token)
    if(!token){
        return res.status(400).json({
            success:false,
            status:400,
            message:'no token provided'
        })
    }

    try {
        const decode= jwt.verify(token, process.env.JWT_SECER)
        req.user=await User.findById(decode.user_id)
        next()
    } catch (error) {
        // console.log(error)
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}