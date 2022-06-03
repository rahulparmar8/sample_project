"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const catgrorySchema = new mongoose_1.default.Schema({
    name: { type: String },
    desc: { type: String },
    image: { type: String },
}, {
    timestamps: true
});
const catgoryModel = mongoose_1.default.model("catgory", catgrorySchema);
exports.default = catgoryModel;
