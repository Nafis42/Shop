import express, { Router } from 'express'
import { isAdmin, verifyJWT } from '../middlewares/auth.middleware'
import { createCategoryController, updateCategoryController } from '../controllers/category.controller'

// const router=express.Router()
const router=Router()

// router.post('/create-category',verifyJWT,isAdmin,createCategoryController)
router.route('/create-category').post(isAdmin,verifyJWT,createCategoryController);
router.route('/update-category/:id').put(isAdmin,verifyJWT,updateCategoryController);
router.route('/delete-category/:id').delete(isAdmin,verifyJWT,updateCategoryController);

export default router