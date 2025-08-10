import Transiction from "../models/transactinSchema.js"

export const getAllTransForAdmin=async(req, res, next)=>{

    try {
        const trans=await Transiction.find()
        if(!trans) return res.status(201).json('there is no any transiction')
        
        res.status(201).json(trans)
    } catch (error) {
        next(error)
    }
}