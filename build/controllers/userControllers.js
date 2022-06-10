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
exports.userController = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailTransporter_1 = require("../helper/emailTransporter");
class userController {
    constructor() {
        this.userRegisterForm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                return res.render("registerPage");
            }
            catch (error) {
                console.log(error);
            }
        });
        this.userRegisterData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashpassword = yield bcryptjs_1.default.hash(req.body.password, salt);
                // const token = getToken(req.body.email);
                const { name, email, mob, password } = req.body;
                const token = crypto_1.default.randomBytes(35).toString('hex');
                // const token =getToken(req.body.email);
                const data = new userModel_1.default({
                    name: name,
                    email: email,
                    mob: mob,
                    password: hashpassword,
                    emailToken: token,
                    emailVerification: true,
                    status: true,
                });
                if (req.file) {
                    data.image = req.file.filename;
                }
                // console.log(data);
                const result = yield userModel_1.default.create(data);
                yield emailTransporter_1.transporter.sendMail({
                    from: "hey@buddy.com",
                    to: "rahul.p@peerbits.com",
                    subject: "Email verification link ✔",
                    html: `<h1>Verify your email.</h1>
                <a href='http://localhost:3000/email/verify/${token}'><button>Click here to verify</button></a>`,
                });
                req.session.message = "Check your email & verify it.";
                return res.redirect("/login");
            }
            catch (error) {
                console.log(error);
            }
        });
        this.userLogInForm = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                return res.render("logInPage");
            }
            catch (error) {
                console.log(error);
            }
        });
        this.userLogIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                console.log(body);
                const user = yield userModel_1.default.findOne({ email: body.email });
                if (!user) {
                    throw { alert: [{ msg: "User not found" }] };
                }
                if ((user === null || user === void 0 ? void 0 : user.isEmailVerified) === false) {
                    throw {
                        alert: [{ msg: "Email is not verified" }],
                    };
                }
                const validPassword = yield bcryptjs_1.default.compare(body.password, user.password);
                console.log(validPassword);
                if (!validPassword) {
                    throw { alert: [{ msg: "Password does not matched" }] };
                }
                // req.session.user = {
                //     _id: user?._id,
                //     email: user?.email,
                //     name: user?.name,
                // userProfile: user?.userProfile,
                // };
                return res.redirect("/product/list");
            }
            catch (error) {
                console.log(error);
            }
        });
        this.emailVerification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.params.token;
                const jwtSecretKey = process.env.JWT_SECRET_KEY;
                const verified = jsonwebtoken_1.default.verify(token, jwtSecretKey);
                const emailTokenCHeck = yield userModel_1.default.findOne({ email: verified.email });
                if (verified.email && (emailTokenCHeck === null || emailTokenCHeck === void 0 ? void 0 : emailTokenCHeck.emailToken) !== null) {
                    const data = yield userModel_1.default.updateOne({ email: verified.email }, { isEmailVerified: true, emailToken: null });
                    if (data.modifiedCount === 1) {
                        req.session.message = "Email verified.Now you can log in.";
                        return res.redirect("/login");
                    }
                }
                req.session.message = "Email already verified.";
                return res.redirect("/login");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.userController = userController;
