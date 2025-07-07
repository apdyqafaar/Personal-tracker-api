import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export  const generateToken=(user_id)=>{
  return jwt.sign({user_id},process.env.JWT_SECER, {expiresIn:'7d'} )
}