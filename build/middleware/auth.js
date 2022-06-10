"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCheck = exports.authUser = void 0;
const authUser = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.redirect("/login");
};
exports.authUser = authUser;
const userCheck = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/dashboard");
    }
    return next();
};
exports.userCheck = userCheck;
