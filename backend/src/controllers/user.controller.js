import User from "../models/user.model.js";

/**
 * GET LOGGED-IN USER PROFILE
 * Protected Route
 */
export const getProfile = async (req, res) => {

   try {

      // safety check
      if (!req.user?.id) {
         return res.status(401).json({
            success: false,
            message: "Unauthorized access"
         });
      }

      // fetch user from DB
      const user = await User.findById(req.user.id)
         .select("-password -refreshToken");

      // if user not found
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found"
         });
      }

      // success response
      res.status(200).json({
         success: true,
         user
      });

   } catch (error) {

      res.status(500).json({
         success: false,
         message: error.message
      });

   }
};


/**
 * (OPTIONAL) GET USER BY ID (ADMIN FEATURE)
 */
export const getUserById = async (req, res) => {

   try {

      const { id } = req.params;

      const user = await User.findById(id)
         .select("-password -refreshToken");

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found"
         });
      }

      res.status(200).json({
         success: true,
         user
      });

   } catch (error) {

      res.status(500).json({
         success: false,
         message: error.message
      });

   }
};