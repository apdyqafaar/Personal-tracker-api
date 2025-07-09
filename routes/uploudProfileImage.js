
import express from "express";
import { protecte } from "../middlewares/protected.js";
import { upload } from "../middlewares/upload.js";
import { uploadFile } from "../controllers/uploadImage.js";
const router=express.Router()

router.post('/', protecte, upload.single('file'), uploadFile)


export default router