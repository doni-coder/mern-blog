import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiErrorHandle.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("cookie",req.cookies);
      if (!token) {
        throw new ApiError(400, "unauthorized");
      }
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
    
      if (!user) {
        throw new ApiError(400, "invalid access token");
      }
      req.user = user;
      next();
    } catch (error) {
        throw new ApiError(401, error.message || "invalid access token")
    }
});

export {verifyJwt}