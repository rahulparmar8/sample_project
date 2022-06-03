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
const sorts_1 = require("../helper/sorts");
const deleteFile_js_1 = require("../helper/deleteFile.js");
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
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
                // console.log('file===>',JSON.stringify(req.file))
                const errors = (0, express_validator_1.validationResult)(req);
                // console.log('errors====', errors)
                if (!errors.isEmpty()) {
                    const result = yield produtModels_js_1.default.find();
                    return res.render("addproduct", {
                        bodyData: req.body,
                        alert: errors.array(),
                        data: result,
                    });
                }
                // console.log('dh====>>', req.file)
                const { name, desc, discount, price, image, status } = req.body;
                // console.log("Body", req.body);
                const data = new produtModels_js_1.default({
                    name: name,
                    desc: desc,
                    discount: discount,
                    price: price,
                    image: image,
                    status: true
                });
                // console.log("img", req.files); 
                const body = req.body;
                if (req.file) {
                    body.image = req.file.filename;
                }
                const result = yield produtModels_js_1.default.create(body);
                // console.log("save====>", result);
                return res.redirect("/product/list");
            }
            catch (error) {
                console.log(error);
            }
        });
        // All Product List  //
        this.listProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const perPage = 5;
                const page = req.query.page || 1;
                const recievedData = (0, sorts_1.sorting)(req.query);
                // let searchKeyword = req.query.search;
                const searchKeyword = req.query.search;
                // let mysort = { name: 1 }
                // console.log(page, "  ", perPage, " ", perPage * Number(page) - perPage)
                let searchObj = {};
                if (searchKeyword) {
                    searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchKeyword)
                        ? {
                            $or: [{ discount: searchKeyword }, { price: searchKeyword }],
                        }
                        : { name: new RegExp(`${searchKeyword.toString().trim()}`, "i") };
                }
                // console.log("searc=>>>>>",searchKeyword);
                // console.log(recievedData.sortMethod);
                const result = yield produtModels_js_1.default
                    .find(searchObj)
                    .sort(recievedData.sortMethod)
                    .skip(perPage * Number(page) - perPage)
                    .limit(perPage);
                const count = yield produtModels_js_1.default.count(searchObj);
                // const count = await productModel.count(
                //   searchKeyword ? { name: req.query.search } : {}
                // );
                // console.log(result)
                return res.render("listproduct", {
                    data: result,
                    current: page,
                    queryData: req.query,
                    pages: Math.ceil(count / perPage),
                    dodyData: undefined,
                    search: searchKeyword,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        //   GET Edit Product Page    //
        this.editProductPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield produtModels_js_1.default.findById(req.params.id, req.body);
                //   console.log(req.body);
                return res.render("editproduct", {
                    data: results,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        //    POST Edit Product Data     //
        this.editProductData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const id = req.params.id;
                const body = req.body;
                const data = yield produtModels_js_1.default.findById(req.body.id);
                // console.log(data ,body);
                // console.log(body.image);
                // console.log(body.productImage);
                // console.log(req.file?.filename);
                if (req.file) {
                    body.image = req.file.filename;
                    (0, deleteFile_js_1.deleteFileExt)(data.image);
                }
                const result = yield produtModels_js_1.default.findByIdAndUpdate(req.params.id, req.body, body);
                // console.log("img", req.file);
                // console.log("reshult=>>>", result);
                // console.log(data);
                return res.redirect("/product/list");
            }
            catch (error) {
                console.log(error);
            }
        });
        //  View Product Page   //
        this.viewProductPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                // const viewData: any = await productModel.aggregate([
                //   {
                //     $match: { _id: new mongoose.Types.ObjectId(`${id}`) },
                //   },
                // ]);
                const viewData = yield produtModels_js_1.default.findOne({
                    _id: new mongoose_1.default.Types.ObjectId(`${id}`)
                });
                // console.log(viewData);
                // const product = viewData[0];
                return res.render("viewproduct", {
                    data: viewData,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.statusChange = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("in api");
                const data = req.params.data;
                const id = req.params.id;
                const queryData = req.query;
                // console.log(data);
                // console.log(queryData);
                const dataChange = yield produtModels_js_1.default.updateOne({ _id: id }, data === "0" ? { status: 1 } : { status: 0 });
                // console.log("status", dataChange);
                if (!dataChange) {
                    return res.redirect("/product/list");
                }
                const qs = Object.keys(queryData)
                    .map((key) => `${key}=${queryData[key]}`)
                    .join("&");
                return res.redirect(`/product/list?${qs}`);
            }
            catch (error) {
                console.log(error);
            }
        });
        //  Delete Product Data     //
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield produtModels_js_1.default.findById(req.params.id);
                (0, deleteFile_js_1.deleteFileExt)(data.image);
                yield produtModels_js_1.default.findByIdAndDelete(req.params.id);
                return res.redirect("/product/list");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Product;
