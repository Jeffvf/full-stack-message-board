import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import userRoutes from "./routers/users.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

app.use('/users', userRoutes);

const PORT = process.env.PORT || 8000;

const mongoDB = process.env.MONGODB_URL || process.env.MONGODB_DEV_URL;

mongoose.set('strictQuery', false);
mongoose.connect(mongoDB, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  app.listen(PORT, () => console.log('Listening on port: '+ PORT));
}).catch((error) => {
  console.log(error);
});
