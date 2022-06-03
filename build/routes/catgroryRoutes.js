"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catgroryController_1 = __importDefault(require("../controllers/catgroryController"));
const uploadImage_1 = require("../helper/uploadImage");
const multer = require('multer');
const category = new catgroryController_1.default();
const router = (0, express_1.Router)();
router.get("/list", category.listCategory);
router.get("/add/", category.addCategoryPage);
router.post("/add/", uploadImage_1.upload.single("image"), category.addCategoryData);
router.get("/edit/:id", category.editCategoryPage);
router.post("/edit/:id", uploadImage_1.upload.single("image"), category.editCategoryData);
router.get("/view/:id", category.viewCategoryPage);
router.get("/delete/:id/", category.deleteCategory);
exports.default = router;
