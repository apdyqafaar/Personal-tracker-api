import { success } from "zod/v4"
import Transiction from "../models/transactinSchema.js"



export const getAllTrans=async(req, res, next)=>{
     
    try {
        const trans=await Transiction.find({Author:req.user?._id?.toString()})
        
        if(!trans)return res.status(401).json({
            success:false,
            status:401,
            message:'you dont have transiction yet!'
        })

             res.status(200).json(trans)
    } catch (error) {
        next(error)
    }
}


export const registerTransiction=async(req, res, next)=>{

     if(!req.body) return next('no trans was provided')
        const {title, amount, type, category, date,  }=req.body
    try {
        const trans=await Transiction.create({Author:req.user?._id?.toString(), title, amount, type, category, date})

        res.status(201).json(trans)

    } catch (error) {
        next()
    }
}


export const updatedTrans=async(req, res, next)=>{
    const trans_id=req.params.id
    if(!trans_id) return next('no transiction id was provided')

   console.log(trans_id)
    if(!req.body) return next('no data was provided')

        let {Author}=req.body
        if(Author){
             Author=req.user?._id?.toString()  /* halkan waxaan ku hubinaynaa inuusan isbadlin Authorku  waxkasta oo dhaca xitaa haduuu userku soo baaso hhh */ 
        }
      
       

     try {
      
        const updatedTrans=await Transiction.findOneAndUpdate({_id:trans_id, Author:req.user?._id.toString()},req.body, {new:true})
       console.log(updatedTrans)

        if(!updatedTrans)return res.status(401).json({
            success:false,
            status:401,
            message:'you dont have access to update this transiction'
        })

             res.status(201).json(updatedTrans)

     } catch (error) {
        next(error)
     }
}

export const deleteTrans=async (req, res, next)=>{
         const trans_id=req.params.id
         if(!trans_id) return next('no transiction id was provided')
    try {
        const deletedTrans=await Transiction.findOneAndDelete({_id:trans_id,  Author:req.user?._id.toString()})
        // console.log(deletedTrans)
        if(!deletedTrans)return res.status(401).json({
            success:false,
            status:401,
            message:'you dont have access to delete this transiction'
        })
        res.status(201).json('Transicrion was deleted successfully')
    } catch (error) {
        next(error)
    }
}