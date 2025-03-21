import {Category} from '../models/category.model.js'
import slugify from 'slugify'
import { ApiError } from "../utils/ApiError";

export const createCategoryController= async (req,res)=>{
    try {
        
        const {name}=req.body;

        if(!name) throw new ApiError(400,"please enter the category name");

        const existingCategory= await Category.findOne({name});

        if(existingCategory) throw new ApiError(400,"this category-name already exists");

        const category=await Category.create({
            name,
            slug:slugify(name)
        })

        const createdCategory=await Category.findById(category._id);

        if(!createdCategory) throw new ApiError(400,"Error in creating category");

        return res.status(201).json(
            new ApiResponse(200,createdCategory,"Category created successfully")
        )

    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while creating Category")
        )
    }
}

export const updateCategoryController= async (req,res)=>{
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        return res.status(201).json(
            new ApiResponse(200,category,"Category created successfully",)
        )
    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while updating Category")
        )
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete(id);
      return res.status(201).json(
        new ApiResponse(200,"Category deleted successfully",)
    )
    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while deleting Category")
        )
    }
  };