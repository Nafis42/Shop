import mongoose from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
},{timestamps:true});

export const Category= mongoose.model("Category", categorySchema);