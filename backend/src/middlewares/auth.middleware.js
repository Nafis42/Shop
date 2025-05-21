import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return next(new ApiError(401, "Unauthorized request"));
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return next(new ApiError(401, "Invalid Access Token"));
        }

        req.user = user;
        next();
    } catch (error) {
        next(new ApiError(401, error.message || "Invalid access token")); // Forward error to Express
    }
};


export const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return next(new ApiError(401, "Unauthorized: No user found"));
        }

        if (req.user.role !== "admin") {
            return next(new ApiError(403, "Forbidden: Admins only"));
        }

        next(); // Proceed if the user is an admin
    } catch (error) {
        next(new ApiError(500, "Internal Server Error"));
    }
};
