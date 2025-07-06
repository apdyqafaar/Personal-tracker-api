import express from 'express';
import dotenv from'dotenv'
import mongoose from 'mongoose';
import { notFound } from './middlewares/notFoundError.js';
import { globalErr } from './middlewares/golobalErrorHndler.js';

const app=express()
dotenv.config()
const port =process.env.PORT || 3001

app.use(express.json())

app.get('/', (req, res)=>{
    res.status(201).json('wellcom to personal tracker app')
})

app.use(notFound);
app.use(globalErr)

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('mongodb was connected succesfuly'))
.catch((e)=> console.log(e))

app.listen(port,()=>console.log(`app is listening port of ${port}`))