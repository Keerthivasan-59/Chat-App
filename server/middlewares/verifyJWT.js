import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const verifyJWT =async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, "test");

      // req.user = await User.findById(decoded.id).select("-password");
      req.userId=decoded.id
      // console.log(req.user)
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
