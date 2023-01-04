import express from "express";
import { getAllMessages, sendMessage } from "../controllers/message.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.get("/:chatId", verifyJWT, getAllMessages);

router.post("/", verifyJWT, sendMessage);

export default router;
