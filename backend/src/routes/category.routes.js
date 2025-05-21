import express, { Router } from 'express'
import { isAdmin, verifyJWT } from '../middlewares/auth.middleware.js'
import { createCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/category.controller.js'

// const router=express.Router()
const router=Router()

// router.post('/create-category',verifyJWT,isAdmin,createCategoryController)
router.route('/create-category').post(verifyJWT,isAdmin,createCategoryController);
router.route('/update-category/:id').put(verifyJWT,isAdmin,updateCategoryController);
router.route('/delete-category/:id').delete(verifyJWT,isAdmin,deleteCategoryController);
router.route('/get-category').get(getCategoryController);

export default router