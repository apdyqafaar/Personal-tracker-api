import express from "express";
import { protecte } from "../middlewares/protected.js";
import { validator } from "../middlewares/SchemaVlidator.js";
import { transactionSchema } from "../schema/transSchema.js";
import { deleteTrans, getAllTrans, registerTransiction, updatedTrans } from "../controllers/transiction.js";
const router=express.Router()

router.post('/', protecte, validator(transactionSchema), registerTransiction)
router.put('/:id', protecte, updatedTrans)
router.delete('/:id', protecte, deleteTrans)
router.get('/', protecte, getAllTrans)
export default router