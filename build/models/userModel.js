"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String, unique: false },
    mob: { type: String },
    password: { type: String },
    image: { type: String },
    emailToken: { type: String },
    emailVerification: { type: Boolean },
    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});
const userModel = mongoose_1.default.model("users", userSchema);
exports.default = userModel;
