import mongoose from "mongoose";
import  Mongoose  from "mongoose";

const transactionSchemas= mongoose.Schema({
    title:String,
    description:String,
    amount:String,
    type:String,
    category:String,
    date:Date,
    Author:String
},
{timestamps:true}
)

const Transiction= mongoose.model('Transiction', transactionSchemas)

export default Transiction