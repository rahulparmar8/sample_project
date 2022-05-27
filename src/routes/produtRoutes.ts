import express, { Router } from "express";
import Product from "../controllers/produtController";
import { check } from "express-validator";

const product = new Product();
const router = express.Router();
router.get("/add/", product.productAddPage);
router.post("/add/",
    check("name", "Name is required. Please enter your response. ")
        .not()
        .isEmpty(),
    check("desc", "Desc is required. Please enter your response. ")
        .not()
        .isEmpty(),
    check("discount")
        .not()
        .isEmpty()
        .trim()
        .withMessage("Discount is required. Please enter your response. ")
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
    check("image", "Image is required. Please enter your response. ")
        .not()
        .isEmpty(),
    product.productAddData);
router.get("/list", product.listProduct);
router.get("/delete/:id", product.deleteProduct);



export default router;