"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: { type: String },
    desc: { type: String },
    image: { type: String },
    parent: { type: Number, enum: [0, 1], default: 0 },
    parent_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});
const categoryModel = mongoose_1.default.model("category", categorySchema);
exports.default = categoryModel;
