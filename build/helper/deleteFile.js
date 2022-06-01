"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileExt = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteFileExt = (image) => {
    console.log("inn fun delete");
    const pathTrace = path_1.default.join(__dirname, "../uploads");
    fs_1.default.unlink(`${pathTrace}/${image}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("successfully deleted");
    });
};
exports.deleteFileExt = deleteFileExt;
