"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produtController_1 = __importDefault(require("../controllers/produtController"));
const express_validator_1 = require("express-validator");
const product = new produtController_1.default();
const router = express_1.default.Router();
router.get("/add/", product.productAddPage);
router.post("/add/", (0, express_validator_1.check)("name", "Name is required. Please enter your response. ")
    .not()
    .isEmpty(), (0, express_validator_1.check)("desc", "Desc is required. Please enter your response. ")
    .not()
    .isEmpty(), (0, express_validator_1.check)("discount")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Discount is required. Please enter your response. ")
    .bail()
    .isDecimal()
    .withMessage("Discount must be decimal"), (0, express_validator_1.check)("price")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Product Price is required.")
    .bail()
    .isDecimal()
    .withMessage("Price must be decimal"), (0, express_validator_1.check)("image", "Image is required. Please enter your response. ")
    .not()
    .isEmpty(), product.productAddData);
router.get("/list", product.listProduct);
router.get("/delete/:id", product.deleteProduct);
exports.default = router;
