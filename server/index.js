import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './routes/user.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);

const CONNECTION_URL =
  process.env.CONNECTION_URL ||
  "mongodb+srv://Keerthivasan:vasan2012@cluster0.csnpfrb.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.listen(PORT, () => {
  connect();
  console.log("Connected to backend.");
});
