import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./connection/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

import itemRouter from './router/item.router.js';

app.use('/api/v1/item', itemRouter);

const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`The server is listening on ${port}`);
  });
};

start();
