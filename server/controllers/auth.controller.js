import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import genTokenAndSetCookie from "../utils/genTokenAndSetCookie.js";
import genOTP from "../utils/genOTP.js";
import sendEmail from "../utils/sendEmail.js";

export const signup = async (req, res) => {
      try {
            let { email, password, name } = req.body;

            if (!email || !password || !name) {
                  throw new Error("All fields are required!!");
            }

            const userAlreadyExists = await User.findOne({ email });
            if (userAlreadyExists) {
                  return res.status(400).json({
                        success: false,
                        message: "User already exists!",
                  });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            let otp = genOTP();

            const user = new User({
                  name,
                  email,
                  password: hashedPassword,
                  emailOtp: otp,
            });

            await sendEmail(
                  email,
                  `Hardcoding.do verification code`,
                  `Your verification code is ${otp}`,
            );

            await user.save();

            res.status(201).json({
                  success: true,
                  message: "User created successfully",
            });
      } catch (error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
      }
};

export const mailVerify = async (req, res) => {
      try {
            const { email, otp } = req.body;

            if (!email || !otp) {
                  return res
                        .status(400)
                        .json({ msg: "Email and OTP are required" });
            }

            const user = await User.findOne({ email });

            if (!user) {
                  return res.status(404).json({ msg: "User not found" });
            }

            if (user.isVerified) {
                  return res
                        .status(400)
                        .json({ msg: "Email already verified" });
            }

            if (user.emailOtp !== otp) {
                  return res.status(401).json({ msg: "Invalid OTP" });
            }

            user.isVerified = true;
            user.emailOtp = null;
            await user.save();

            genTokenAndSetCookie(res, user._id);

            res.status(200).json({
                  success: true,
                  message: "Email verified successfully",
            });
      } catch (error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
      }
};

export const login = async (req, res) => {
      try {
            let { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(400).json({
                        success: false,
                        message: "Invalid credentials",
                  });
            }

            const isPasswordValid = await bcrypt.compare(
                  password,
                  user.password,
            );
            if (!isPasswordValid) {
                  return res.status(400).json({
                        success: false,
                        message: "Invalid credentials",
                  });
            }

            if (!user.isVerified) {
                  return res.status(401).json({
                        success: false,
                        message: "You are not verified. Please verify before logging in",
                  });
            }

            genTokenAndSetCookie(res, user._id);

            await user.save();

            res.status(200).json({
                  success: true,
                  message: "Logged in successfully",
            });
      } catch (error) {
            console.log(error);
            res.status(500).json({ msg: error.message });
      }
};

export const logout = async (req, res) => {
      try {
            res.clearCookie("token");
            res.status(200).json({
                  success: true,
                  message: "Logged out successfully",
            });
      } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: error.message });
      }
};