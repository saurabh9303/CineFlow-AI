import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

// REGISTER
export const register = async (req, res) => {

   try {

      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({
            message: "User already exists"
         });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
         name,
         email,
         password: hashedPassword
      });

      const token = generateToken(user);

      res.cookie("token", token, {
         httpOnly: true,
         secure: false,
         sameSite: "lax"
      });

      res.json({
         success: true,
         user: {
            id: user._id,
            name: user.name,
            email: user.email
         }
      });

   } catch (err) {

      res.status(500).json({ message: err.message });
   }
};

// LOGIN
export const login = async (req, res) => {

   try {

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({
            message: "User not found"
         });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.status(400).json({
            message: "Invalid password"
         });
      }

      const token = generateToken(user);

      res.cookie("token", token, {
         httpOnly: true,
         secure: false,
         sameSite: "lax"
      });

      res.json({
         success: true,
         user: {
            id: user._id,
            name: user.name,
            email: user.email
         }
      });

   } catch (err) {

      res.status(500).json({ message: err.message });
   }
};

// LOGOUT
export const logout = (req, res) => {

   res.clearCookie("token");

   res.json({
      success: true,
      message: "Logged out"
   });
};