import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY,
    cloud_name:process.env.CLOUDINARY_NAME
})

export default cloudinary