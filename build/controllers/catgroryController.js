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
const catgroryModels_1 = __importDefault(require("../models/catgroryModels"));
const mongoose_1 = __importDefault(require("mongoose"));
const deleteFile_1 = require("../helper/deleteFile");
class Category {
    constructor() {
        this.addCategoryPage = (req, res) => {
            try {
                return res.render("addCategory");
            }
            catch (error) {
                console.log(error);
            }
        };
        this.addCategoryData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("in api");
                const { name, desc, image } = req.body;
                console.log(req.body);
                const data = new catgroryModels_1.default({
                    name: name,
                    desc: desc,
                    image: image
                });
                console.log("image", req.file);
                const body = req.body;
                if (req.file) {
                    body.image = req.file.filename;
                }
                const result = yield catgroryModels_1.default.create(body);
                // console.log(result);
                res.redirect("/category/list/");
            }
            catch (error) {
                console.log(error);
            }
        });
        this.listCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield catgroryModels_1.default.find();
                // console.log("=>>>",result);
                return res.render("listCategory", {
                    data: result
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.editCategoryPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield catgroryModels_1.default.findById(req.params.id, req.body);
                // console.log(results);
                return res.render("editCategory", {
                    data: results
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.editCategoryData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const data = yield catgroryModels_1.default.findById(req.body.id);
                console.log("Data=>>>", data);
                if (req.file) {
                    body.image = req.file.filename;
                    (0, deleteFile_1.deleteFileExt)(data.image);
                }
                console.log(data);
                const result = yield catgroryModels_1.default.findByIdAndUpdate(req.body, body);
                console.log(result);
                return res.redirect("/category/list");
            }
            catch (error) {
                console.log(error);
            }
        });
        this.viewCategoryPage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const viewData = yield catgroryModels_1.default.findOne({
                    _id: new mongoose_1.default.Types.ObjectId(`${id}`)
                });
                return res.render("viewCategory", {
                    data: viewData,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.deleteCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield catgroryModels_1.default.findByIdAndDelete(req.params.id);
                return res.redirect("/category/list");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Category;
