import express from 'express';
import dotenv from'dotenv'
import mongoose from 'mongoose';
import { notFound } from './middlewares/notFoundError.js';
import { globalErr } from './middlewares/golobalErrorHndler.js';
import AuthRouter from './routes/Auth.js';
import uploadProfileRouter from './routes/uploudProfileImage.js';
import transRouter from './routes/transictions.js';
import adminRouter from './routes/admin.js';
import helmet from 'helmet';
import morgan from 'morgan';
import setupSwagger from './utils/swagger.js'
import { rateLimitFun } from './middlewares/rateLimit.js';

const app=express()
dotenv.config()
const port =process.env.PORT || 3001

setupSwagger(app);

if(process.env.NODE_ENV='development'){
    app.use(morgan('combined'))
}

app.use(helmet())
app.use(rateLimitFun)
app.use(express.json())



app.use('/auth', AuthRouter)
app.use('/upload-profile', uploadProfileRouter)
app.use('/trans', transRouter)
app.use('/admin', adminRouter)

app.get('/', (req, res)=>{
    res.status(201).json('wellcom to personal tracker app')
})

app.use(notFound);
app.use(globalErr)


console.log(process.env.MONGO_URL_PRO)
const mongoURI = process.env.NODE_ENV === 'development'
  ?process.env.MONGO_URL_PRO
  :process.env.MONGO_URL_DEV


if (!mongoURI) {
  console.error('❌ MongoDB URI is missing. Please check environment variables.');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, 
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); 
});

app.listen(port,()=>console.log(`app is listening port of ${port}`))