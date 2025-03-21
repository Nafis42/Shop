import { Products } from "../models/products.model";
import slugify from "slugify";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { ApiError } from "../utils/ApiError";

const createProduct=async(req,res)=>{
    try {
        const {name,description,price,category,quantity,shipping}=req.body;

        if(!name){
            throw new ApiError(400,"Please enter the Name")
        }
        if(!description){
            throw new ApiError(400,"Please enter the description")
        }
        if(!price){
            throw new ApiError(400,"Please enter the price")
        }
        if(!category){
            throw new ApiError(400,"Please enter the category")
        }
        if(!quantity){
            throw new ApiError(400,"Please enter the quantity")
        }

        const photoLocalPath = req.files?.photo[0]?.path;
        if (!photoLocalPath) {
            throw new ApiError(400, "Photo file is required")
        }
        const photo=uploadOnCloudinary(photoLocalPath);
        if(!photo) {
            throw new ApiError(400,"Problem in uploading photo in cloudinary")
        }
        const product=await Products.create({
            name,
            slug:slugify(name),
            description,
            price,
            category,
            quantity,
            photo:photo.url,
            shipping


        })
        const createdProduct = await Products.findById(product._id);

        if (!createdProduct) {
            throw new ApiError(500, "Product creation failed");
        }

        return res.status(201).json(
            new ApiResponse(200,createdProduct,"Product created successfully")
        )


    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while creating Product")
        )
    }
}

const getProducts=async(req,res)=>{
    try {
        const products=await Products.find({})
        .populate("category")
        .limit(12)
        .sort({ createdAt: -1 });

        console.log(products);

        return res.status(201).json(
            new ApiResponse(200,products,"Products fetched successfully")
        )


    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while fetching Product")
        )
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params; // Get product ID from request URL

        const product = await Products.findById(id);
        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        await Products.findByIdAndDelete(id);

        return res.status(201).json(
            new ApiResponse(200,"Product deleted successfully")
        )

    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while deleting Product")
        )
    }
};

const updateProduct=async(req,res)=>{
    try {
        const { id } = req.params; // Extract product ID from URL
        const { name, description, price, category, quantity, shipping } = req.body;

        const product = await Products.findById(id);
        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        // Check if a new name is provided and update the slug accordingly
        const updatedData = {
            name: name || product.name,
            slug: name ? slugify(name) : product.slug,
            description: description || product.description,
            price: price || product.price,
            category: category || product.category,
            quantity: quantity || product.quantity,
            shipping: shipping || product.shipping,
        };
        console.log(updateProduct)

        // Check if a new photo is provided
        if (req.files?.photo) {
            const photoLocalPath = req.files.photo[0].path;
            const photo = uploadOnCloudinary(photoLocalPath);
            if (!photo) {
                throw new ApiError(400, "Problem uploading photo to Cloudinary");
            }
            updatedData.photo = photo.url;
        }

        const updatedProduct = await Products.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(201).json(
            new ApiResponse(200,updatedProduct,"Product updated successfully")
        )


    } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
            // Automatically serialize the ApiError into JSON
            return res.status(error.statusCode).json(error);
          }
        return res.status(500).json(
            new ApiError(500,"Something went wrong while updating Product")
        )
    }
}

export {createProduct,getProducts,deleteProduct,updateProduct}
