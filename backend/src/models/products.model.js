import mongoose from "mongoose";
import { Schema } from "mongoose"

const productSchema=new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        category: {
          type: [mongoose.ObjectId],
          ref: "Category",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        photo: {
          type:String,
          required:true,
        },
        shipping: {
          type: Boolean,
        },
      },
      { timestamps: true }
)

export const Products=mongoose.model("Products",productSchema);