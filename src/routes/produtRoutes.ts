import express, { Router } from "express";
import Product from "../controllers/produtController";
import { check } from "express-validator";
import { upload } from "../helper/uploadImage";

const multer = require('multer')
const product = new Product();
const router = express.Router();
//const upload = multer({ dest: "../uploads" });


router.get("/add/", product.productAddPage);
router.post("/add/",
  upload.single("image"),
  check("name", "Name is required. Please enter your Name. ").not().isEmpty(),
  check("desc", "Desc is required. Please enter your Description. ")
    .not()
    .isEmpty(),
  check("discount")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Discount is required. Please enter your Discount. ")
    .bail()
    .isDecimal()
    .withMessage("Discount must be decimal"),
  check("price")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Product Price is required.")
    .bail()
    .isDecimal()
    .withMessage("Price must be decimal"),
  product.productAddData);
router.get("/list/", product.listProduct);
router.get("/edit/:id", product.editProductPage);
router.post("/edit/:id", upload.single("image"), product.editProductData);
router.get("/view/:id", product.viewProductPage);
router.get("/list/status/:id/:data/", product.statusChange);
router.get("/delete/:id/", upload.single("image"), product.deleteProduct);

export default router;