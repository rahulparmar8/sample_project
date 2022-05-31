"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String },
    desc: { type: String },
    price: { type: String },
    discount: { type: Number },
    image: { type: String },
    status: { type: Number, enum: [0, 1], default: 1 },
});
const productModel = mongoose_1.default.model("product", productSchema);
exports.default = productModel;
