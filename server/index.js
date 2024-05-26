import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDatabase from './config/db.js';
import notFound from './middleware/notFound.js';
import errorMiddleware from './middleware/error.js';

import userRouter from './routes/user.js';
import locationRouter from './routes/location.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

//connect database
connectDatabase();

const app = express();

//middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'DELETE', 'POST', 'PUT'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//router
app.use("/api/user", userRouter);
app.use("/api/location", locationRouter);

//error handlers
app.use(notFound);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));