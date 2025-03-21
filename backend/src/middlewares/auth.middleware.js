import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"

export const verifyJWT= async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
        if (!user) {
                
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user=user;
        next()

    } catch (error) {
        throw new ApiError(401, error.message || "Invalid access token")
    }

}

export const isAdmin = (req, res, next) => {
    try {
        // Ensure the user is authenticated first
        if (!req.user) {
            return next(new ApiError(401, "no req.user"));
        }

        // Check if user is an admin
        if (req.user.role !== "admin") {
            return next(new ApiError(403, "Access denied. Admins only."));
        }

        next(); // User is an admin, proceed
    } catch (error) {
        next(new ApiError(500, "Internal Server Error"));
    }
};