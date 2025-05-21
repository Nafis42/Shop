import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "../controllers/products.controllers.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()
 
router.route('/create-products').post(
    verifyJWT,
    isAdmin,
    upload.fields([
        {
            name:"photo",
            maxCount:1
        }
    ]),
    createProduct
)

router.route('/update-products/:id').put(
    verifyJWT,
    isAdmin,
    upload.fields([
        { 
            name:"photo",
            maxCount:1
        }
    ]),
    updateProduct
)

router.route('/get-products').get(
    getProducts
)

router.route('/getSingleProduct/:id').get(
    getSingleProduct
)

router.route('/delete-products/:id').delete(verifyJWT,isAdmin,deleteProduct);

export default router