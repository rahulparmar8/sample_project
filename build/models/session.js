"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const session = new mongoose_1.default.Schema({
    key: { type: String },
    value: { type: String }
});
// Model
const SessionModel = mongoose_1.default.model("session", session);
exports.default = SessionModel;
