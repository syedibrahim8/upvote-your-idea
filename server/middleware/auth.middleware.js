import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();


const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, msg: "No token provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ success: false, msg: "Unauthorized - invalid token" });
    }

    req.user = await User.findById(decode.userId).select("-password");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error.message });
  }
};

export default authMiddleware;