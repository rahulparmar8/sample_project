"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produtController_1 = __importDefault(require("../controllers/produtController"));
const express_validator_1 = require("express-validator");
const uploadImage_1 = require("../helper/uploadImage");
const multer = require('multer');
const product = new produtController_1.default();
const router = express_1.default.Router();
//const upload = multer({ dest: "../uploads" });
router.get("/add/", product.productAddPage);
router.post("/add/", uploadImage_1.upload.single("image"), (0, express_validator_1.check)("name", "Name is required. Please enter your Name. ").not().isEmpty(), (0, express_validator_1.check)("desc", "Desc is required. Please enter your Description. ")
    .not()
    .isEmpty(), (0, express_validator_1.check)("discount")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Discount is required. Please enter your Discount. ")
    .bail()
    .isDecimal()
    .withMessage("Discount must be decimal"), (0, express_validator_1.check)("price")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Product Price is required.")
    .bail()
    .isDecimal()
    .withMessage("Price must be decimal"), product.productAddData);
router.get("/list/", product.listProduct);
router.get("/edit/:id", product.editProductPage);
router.post("/edit/:id", uploadImage_1.upload.single("image"), product.editProductData);
router.get("/view/:id", product.viewProductPage);
router.get("/list/status/:id/:data/", product.statusChange);
router.get("/delete/:id/", uploadImage_1.upload.single("image"), product.deleteProduct);
exports.default = router;
