import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.controllers";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware";

const router=Router()
 
router.route('/create-products').post(
    verifyJWT,
    isAdmin,
    upload.fields(
        {
            name:"photo",
            maxCount:1
        }
    ),
    createProduct
)

router.route('/update-products/:id').post(
    verifyJWT,
    isAdmin,
    upload.fields(
        {
            name:"photo",
            maxCount:1
        }
    ),
    updateProduct
)

router.route('/get-products').get(
    getProducts
)

router.route('/delete-products/:id').delete(verifyJWT,isAdmin,deleteProduct);