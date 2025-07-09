import express, { application } from "express";
import { protecte } from "../middlewares/protected.js";
import { athorization } from "../middlewares/authorize.js";
import { getAllTransForAdmin } from "../controllers/admin.js";
const router=express.Router()


router.get('/', protecte, athorization('admin'), (req, res)=>{
    res.status(200).json('wellcome to admin ')
})
router.get('/get-all-trans', protecte, athorization('admin'), getAllTransForAdmin)



export default router