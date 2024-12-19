import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.model.js";

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
        res.status(500).json(
            new ApiError(500,"Something went wrong")
        )
    }

}

export {registerUser}