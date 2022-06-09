import { Router } from "express";
import Category from "../controllers/categoryController";
import { upload } from "../helper/uploadImage";


// const multer = require('multer')
const category = new Category();
const router = Router();

router.get("/list/", category.listCategory)
router.get("/add/", category.addCategoryPage);
router.post("/add/", upload.single("image"), category.addCategoryData);
router.get("/edit/:id", category.editCategoryPage);
router.post("/edit/:id",upload.single("image"), category.editCategoryData);
router.get("/view/:id", category.viewCategoryPage);
router.get("/list/status/:id/:data/", category.statusCategory);
router.get("/delete/:id/", category.deleteCategory);

export default router;