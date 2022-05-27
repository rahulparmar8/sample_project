"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const produtModels_js_1 = __importDefault(require("../models/produtModels.js"));
const express_validator_1 = require("express-validator");
class Product {
    constructor() {
        //  Product Page    //
        this.productAddPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const tabel = await productModel.findById({ _id: req.params.id });
                // console.log(tabel);
                // return res.status(200).json(tabel)
                return res.render("addproduct");
            }
            catch (error) {
                console.log(error);
            }
        });
        //  Add Product //
        this.productAddData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    const result = yield produtModels_js_1.default.find();
                    return res.render("addproduct", {
                        bodyData: req.body,
                        alert: errors.array(),
                        data: result,
                    });
                }
                const { name, desc, discount, price, image } = req.body;
                // console.log(req.body);
                const data = new produtModels_js_1.default({
                    name: name,
                    desc: desc,
                    discount: discount,
                    price: price,
                    image: image
                });
                const result = yield data.save();
                // res.status(200).json({ result, message: "Data Saved" })
                return res.redirect("add");
            }
            catch (error) {
                console.log(error);
            }
        });
        // All Product List  //
        this.listProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield produtModels_js_1.default.find();
                return res.render("listproduct", {
                    data: result
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        //  Delete Product Data     //
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("in API");
                const result = yield produtModels_js_1.default.findByIdAndDelete(req.params.id);
                console.log(result);
                return res.redirect("/product/list/");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Product;
