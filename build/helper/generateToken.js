"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (data) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const dataEmail = {
        email: data,
    };
    const token = jsonwebtoken_1.default.sign(dataEmail, jwtSecretKey);
    return token;
};
exports.getToken = getToken;
