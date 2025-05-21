import {Category} from '../models/category.model.js'
import slugify from 'slugify'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js';

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

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        // Validate input
        if (!name) {
            throw new ApiError(400, "Category name is required");
        }

        // Check if category exists
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            throw new ApiError(404, "Category not found");
        }

        // Check if new name already exists (excluding current category)
        const duplicateCategory = await Category.findOne({
            name,
            _id: { $ne: id } // Exclude current category from duplicate check
        });
        if (duplicateCategory) {
            throw new ApiError(400, "Category name already exists");
        }

        // Update category
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { 
                name, 
                slug: slugify(name) 
            },
            { 
                new: true,
                runValidators: true 
            }
        );

        return res.status(200).json(
            new ApiResponse(200, updatedCategory, "Category updated successfully")
        );
    } catch (error) {
        console.log(error);
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json(error);
        }
        return res.status(500).json(
            new ApiError(500, "Something went wrong while updating Category")
        );
    }
};

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

export const getCategoryController= async (req,res)=>{
    try {
        const categories=await Category.find({});
        return res.status(201).json(
            new ApiResponse(200,categories,"List of categories")
        )
    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while getting Categories")
        )
    }
}  