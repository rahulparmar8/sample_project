"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const produtRoutes_1 = __importDefault(require("./routes/produtRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const DATABASE_URL = "mongodb://localhost:27017/node_practice";
app.use((0, express_session_1.default)({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
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
app.get("/home", (req, res) => {
    res.render("registerPage");
});
app.use("/", userRoutes_1.default);
app.use("/product", produtRoutes_1.default);
app.use("/category", categoryRoutes_1.default);
// Database connection //
mongoose_1.default.connect(`mongodb://localhost:27017/node_practice`).then(() => {
    console.log("connected Database");
});
app.listen(port, () => {
    console.log(`Server is runing... ${port}`);
});
