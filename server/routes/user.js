import express from "express";
import { getAllUsers, signin, signup } from "../controllers/user.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.get('/',verifyJWT ,getAllUsers)

router.post("/signin", signin);
router.post("/signup", signup);

export default router;
