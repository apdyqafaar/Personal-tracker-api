import User from "../models/userSchema.js"
import { generateToken } from "../utils/generateToken.js"
import bcrypt from "bcryptjs"

export const registerNewUser=async(req, res, next)=>{
   let {email, password, role, name,profileUrl}=req.body
     try {
      email=email.toLowerCase()
        const userEsist= await User.findOne({email})

        if(userEsist){
         return res.status(400).json({
            success:false,
            status:400,
            message:`this ${email} email already exist`
         })
        }

        const newUser=await User.create({name, email, password, role, profileUrl})
        const token= generateToken(newUser._id)


        res.status(201).json({token})


     } catch (error) {
        next(error)
     }
}



// login
export const login= async(req, res, next)=>{
   let {email, password}=req.body
  try {
    const logedUser=await User.findOne({email})
     
    if(!logedUser || !(await logedUser.comparePassword(password))){
      return res.status(400).json({
            success:false,
            status:400,
            message:`invalid credential !`
      })
    }

    const token=generateToken(logedUser._id)
     res.status(201).json({token})
  } catch (error) {
   next(error)
  }
}

export const updateProfile=async(req, res, next)=>{
    let {name, email, password, role}=req.body
    const id=req.params.id
   console.log(id)

    

    try {  
      if(password){
      password=await bcrypt.hash(password, 10)
    }
        if(role){
         const
          user=await User.findById(id)
             if(user?.role !=='admin'){
               return res.status(400).json('you dont have accees to change the role') 
             }
        }
            const updateUser=await User.findOneAndUpdate({_id:req.user._id}, {name, email, password}, {new:true})
            console.log(updateUser)
            res.status(201).json('updated successfully')
    } catch (error) {
      next(error)
    }
}