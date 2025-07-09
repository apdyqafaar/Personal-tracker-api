import express from "express";
import { login, registerNewUser, updateProfile } from "../controllers/Auth.js";
import { validator } from "../middlewares/SchemaVlidator.js";
import { loginSchemaZod } from "../schema/userLoginSchemaZod.js";
import { protecte } from "../middlewares/protected.js";
import { userSchemaZod } from "../schema/userSchemaZod.js";

const router=express.Router()

router.post('/register', validator(userSchemaZod), registerNewUser)
router.post('/login', validator(loginSchemaZod), login)
router.put('/update/:id',protecte, updateProfile)


export default router