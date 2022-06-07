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
const categoryModels_1 = __importDefault(require("../models/categoryModels"));
const mongoose_1 = __importDefault(require("mongoose"));
const deleteFile_1 = require("../helper/deleteFile");
const sorts_1 = require("../helper/sorts");
const categoryLookup_1 = require("../helper/categoryLookup");
class Category {
    constructor() {
        // GET  Category Page   //
        this.addCategoryPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const catData = yield categoryModels_1.default.find({ parent: 1 });
                // const catData = await categoryModel.find();
                // console.log(catData);
                return res.render("addCategory", {
                    categorylist: catData,
                    categoryData: undefined,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        //    POST Category Page  //
        this.addCategoryData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const catData = yield (0, categoryLookup_1.categoryListData)();
                const { name, desc, image } = req.body;
                //   console.log(req.body);
                const data = new categoryModels_1.default({
                    name: name,
                    desc: desc,
                    image: image,
                });
                //   console.log("image", req.file);
                const body = req.body;
                if (req.file) {
                    body.image = req.file.filename;
                }
                ;
                // console.log("parent==>", req.body.category);
                body.parent = req.body.category === '0' ? 1 : 0;
                // console.log(req.body);
                if (req.body.category !== "0") {
                    body.parent_id = req.body.category;
                }
                else {
                    body.parent_id = null;
                }
                // console.log(body);
                const result = yield categoryModels_1.default.create(body);
                // console.log(result);
                res.redirect("/category/list/");
            }
            catch (error) {
                console.log(error);
            }
        });
        //    GET All Category List   //
        this.listCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const perPage = 2;
                const page = req.query.page || 1;
                const recievedData = (0, sorts_1.sorting)(req.query);
                const searchKeyword = req.query.search;
                let searchObj = {};
                if (searchKeyword) {
                    searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchKeyword)
                        ? {
                            $or: [{ discount: searchKeyword }, { price: searchKeyword }],
                        }
                        : { name: new RegExp(`${searchKeyword.toString().trim()}`, "i") };
                }
                const result = yield categoryModels_1.default
                    .find(searchObj)
                    .sort(recievedData.sortMethod)
                    .skip(perPage * Number(page) - perPage)
                    .limit(perPage);
                //   console.log("=>>>",result);
                const count = yield categoryModels_1.default.count(searchObj);
                return res.render("listCategory", {
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
        //    GET Edit Category Page  //
        this.editCategoryPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield categoryModels_1.default.findById(req.params.id, req.body);
                // console.log(results);
                return res.render("editCategory", {
                    data: results,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        //    POST Category Data  //
        this.editCategoryData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const data = yield categoryModels_1.default.findById(req.body.id);
                //console.log("body===>", body);
                //console.log("data---->",data);
                // console.log(body.image);
                // console.log(body.productImage);
                // console.log(req.file?.filename);
                if (req.file) {
                    body.image = req.file.filename;
                    (0, deleteFile_1.deleteFileExt)(data.image);
                }
                //   console.log("if condisen", data);
                const result = yield categoryModels_1.default.findByIdAndUpdate(req.body, body);
                // console.log(result);
                return res.redirect("/category/list");
            }
            catch (error) {
                console.log(error);
            }
        });
        //    View Category Page   //
        this.viewCategoryPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const viewData = yield categoryModels_1.default.findOne({
                    _id: new mongoose_1.default.Types.ObjectId(`${id}`),
                });
                return res.render("viewCategory", {
                    data: viewData,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        //    DELETE Category Reacord   //
        this.deleteCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield categoryModels_1.default.findById(req.params.id);
                (0, deleteFile_1.deleteFileExt)(data.image);
                yield categoryModels_1.default.findByIdAndDelete(req.params.id);
                return res.redirect("/category/list");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Category;
