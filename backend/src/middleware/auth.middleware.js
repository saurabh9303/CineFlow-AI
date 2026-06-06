import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

/**
 * AUTH MIDDLEWARE
 */
export const authMiddleware = (req, res, next) => {

   const token = req.cookies?.token;
   console.log("🍪 COOKIE TOKEN:", token);

   if (!token) {
      return res.status(401).json({
         success: false,
         message: "Not logged in"
      });
   }

   try {
      console.log("🔐 JWT SECRET EXISTS:", !!process.env.JWT_SECRET);
      console.log("TOKEN BEFORE VERIFY:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // only trust ID from token
      req.user = {
         id: decoded.id
      };

      next();

   } catch (err) {

      return res.status(401).json({
         success: false,
         message: "Invalid or expired token"
      });

   }
};
