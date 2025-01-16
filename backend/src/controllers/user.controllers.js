import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// import { User } from "../models/user.model.js";


const generateAccessandRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId);
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
    
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
    
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Problem in generating accessToken and refreshToken")
    }

}

const registerUser= async (req,res)=>{
    try {
        const {username,fullname,email,password}=req.body;

    if(!username){
        throw new ApiError(400,"Please enter the userName")
    }
    if(!fullname){
        throw new ApiError(400,"Please enter the fullName")
    }
    if(!email){
        throw new ApiError(400,"Please enter the emailId")
    }
    if(!password){
        throw new ApiError(400,"Please enter the password")
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with this email or username already exists")
    }

    const user= await User.create({
        fullname,
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully",)
    )


    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while registering")
        )
    }

}

const loginUser= async (req,res)=>{
    try {
        const {username,email,password}=req.body;
    
        if(!(username || email)){
            throw new ApiError(400,"Username or email is required")
            // return res.status(400).json(
            //     new ApiError(400,"Username or email is required")
            // )
        }
    
        //find the user
        const user=await User.findOne({
            $or:[{username},{email}]
        })
        if(!user){
            throw new ApiError(404,"User doesn't exist")
            // return res.status(404).json(
            //     new ApiError(404,"User doesn't exist")
            // )
        }
    
        const passwordCheck= await user.isPasswordCorrect(password)
        if(!passwordCheck){
            throw new ApiError(401,"Password is invalid")
            console.log("uffff")
            // return res.status(401).json(
            //     new ApiError(401,"Password is invalid")
            // )
        }
    
        const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id)
    
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
        const options={
            httpOnly: true,
            secure: true
        }
    
        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200,{
            user:loggedInUser,accessToken,refreshToken
        },"User has been logged in successfully"
        ))
    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while login")
        )
    }

}

const logoutUser= async (req,res)=>{
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        
        )
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
    } catch (error) {
        return res.status(500).json(
            new ApiError(500,"Something went wrong while logout")
        )
    }
}

const refreshAccessToken= async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }
    try {
        const decodedToken=jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const {accessToken, newRefreshToken} = await generateAccessandRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while logout")
        )
    } 
}

export {registerUser,loginUser,logoutUser,refreshAccessToken}