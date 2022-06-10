"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userControllers_1 = require("../controllers/userControllers");
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../helper/uploadImage");
const usercontroller = new userControllers_1.userController();
const router = express_1.default.Router();
router.get("/register", usercontroller.userRegisterForm);
router.post("/register", uploadImage_1.upload.single("image"), usercontroller.userRegisterData);
router.get("/login", usercontroller.userLogInForm);
router.post("/login", usercontroller.userLogIn);
router.get("/email/verify/:token", usercontroller.emailVerification);
exports.default = router;
