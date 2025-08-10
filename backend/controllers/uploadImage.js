import User from "../models/userSchema.js";
import cloudinary from "../utils/cloudinary.js";

export const uploadFile=async(req, res, next)=>{
     if(!req.file) return res.status(401).json({
        success:false,
        status:400,
        message:"no file provided"
     })
  
        const stream=cloudinary.uploader.upload_stream(
            {folder:'personal profile url', resource_type:'auto'},
            async(error, result)=>{
                if(error) return next(error);

                let user_id=req.user._id.toString()
                const user= await User.findByIdAndUpdate(user_id, {profileUrl:result.secure_url}, {new:true})
                return res.status(201).json(user)
            }
        )
    stream.end(req.file.buffer)
}