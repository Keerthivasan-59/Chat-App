import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import { Server } from "socket.io";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

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

const server = app.listen(PORT, () => {
  connect();
  console.log("Connected to backend.");
});

const io = new Server(server,{
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on("connection", (socket) => {
  console.log("connected to socket");
});
