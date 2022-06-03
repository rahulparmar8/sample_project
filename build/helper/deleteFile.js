"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileExt = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// const data = data.image
const deleteFileExt = (image) => {
    // console.log(path.join(__dirname, "../uploads/"));
    const pathTrace = path_1.default.join(__dirname, "../uploads/");
    fs_1.default.unlink(`${pathTrace}/${image}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("successfully deleted");
    });
};
exports.deleteFileExt = deleteFileExt;
