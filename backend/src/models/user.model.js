import mongoose from "mongoose"
import { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new Schema(
    {
      username:{
        type:String,
        required:true,
        trim:true
      },
      fullname:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
        unique:true,
        lowecase: true,
        trim: true,
      },
      password:{
        type:String,
        required:[true,'Password is required']
      },
      refreshToken:{
        type:String
      },
      role: {
        type: String,
        enum: ['user', 'admin'], // Only allow these values
        default: 'user',        // Default value
      },
    },
    {timestamps:true}
)

userSchema.pre('save',async function(next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",userSchema)