import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { UserRouter } from './routes/user.js';
import EmployeeRouter from './routes/employee.js';
import GoogleAuthRouter from './routes/googleAuth.js'; // ✅

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

app.use('/auth', UserRouter);
app.use('/api/employees', EmployeeRouter);
app.use('/auth', GoogleAuthRouter); 

mongoose.connect('mongodb://127.0.0.1:27017/authentication');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
