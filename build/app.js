"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const produtRoutes_1 = __importDefault(require("./routes/produtRoutes"));
const catgroryRoutes_1 = __importDefault(require("./routes/catgroryRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
// import session from "express-session";
const app = (0, express_1.default)();
const port = 3000;
const DATABASE_URL = "mongodb://localhost:27017/node_practice";
// const multer = require('multer')
// const upload = multer({ dest: "../uploads" });
// Session //
// app.use(
//   session({
//       secret: "imkey",
//       resave: false,
//       saveUninitialized: true,
//   })
// );
app.use(express_1.default.static("build"));
app.use(express_1.default.static("uploads"));
app.use(express_1.default.static(path_1.default.join(__dirname, "build/uploads")));
// app.use(express.static(path.join(__dirname, "../uploads")));
app.use(express_1.default.static(path_1.default.join(__dirname, "build/files")));
// set Template Enging //
app.use(express_1.default.static("views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "assets")));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/product", produtRoutes_1.default);
app.use("/category", catgroryRoutes_1.default);
// Database connection //
mongoose_1.default.connect(`mongodb://localhost:27017/node_practice`).then(() => {
    console.log("connected Database");
});
app.listen(port, () => {
    console.log(`Server is runing... ${port}`);
});
