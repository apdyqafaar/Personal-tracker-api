import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { notFound } from './middlewares/notFoundError.js';
import { globalErr } from './middlewares/golobalErrorHndler.js';
import AuthRouter from './routes/Auth.js';
import uploadProfileRouter from './routes/uploudProfileImage.js';
import transRouter from './routes/transictions.js';
import adminRouter from './routes/admin.js';
import helmet from 'helmet';
import morgan from 'morgan';
import setupSwagger from './utils/swagger.js';
import { rateLimitFun } from './middlewares/rateLimit.js';
import cors from 'cors';
import { protecte } from './middlewares/protected.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Swagger
setupSwagger(app);

// Logger in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// Middlewares
app.use(cors({
  origin: ['https://personal-tracker-api-z0z2.onrender.com']
}));
app.use(helmet());
app.use(rateLimitFun);
app.use(express.json());

// Routes
app.use('/api/auth', AuthRouter);
app.use('/api/upload-profile', uploadProfileRouter);
app.use('/api/trans', transRouter);
app.use('/api/admin', adminRouter);

app.get('/api/', protecte, (req, res) => {
  res.status(201).json(req.user);
});

// Error handlers
app.use(notFound);
app.use(globalErr);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "..","frontend","dist", "index.html"));
  });
}

// MongoDB connection
const mongoURI = process.env.NODE_ENV === 'development'
  ? process.env.MONGO_URL_DEV
  : process.env.MONGO_URL_PRO;

if (!mongoURI) {
  console.error('❌ MongoDB URI is missing. Please check environment variables.');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL_PRO)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
