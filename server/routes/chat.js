import express from "express";
import {
  addToGroup,
  createChat,
  createGroupChat,
  fetchChat,
  removeFromGroup,
  renameGroup,
} from "../controllers/chat.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.get("/", verifyJWT, fetchChat);
router.post("/", verifyJWT, createChat);
router.post("/group", verifyJWT, createGroupChat);
router.put("/rename", verifyJWT, renameGroup);
router.put("/groupremove", verifyJWT, removeFromGroup);
router.put("/groupadd", verifyJWT, addToGroup);

export default router;
