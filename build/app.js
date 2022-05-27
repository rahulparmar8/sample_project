"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const produtRoutes_1 = __importDefault(require("./routes/produtRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
const DATABASE_URL = "mongodb://localhost:27017/node_practice";
// set Template Enging //
app.use(express_1.default.static("views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "assets")));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
// console.log(__dirname);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// body parts middleware //
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/product", produtRoutes_1.default);
// Database connection //
mongoose_1.default.connect(`mongodb://localhost:27017/node_practice`).then(() => {
    console.log("connected Database");
});
app.listen(port, () => {
    console.log(`Server is runing... ${port}`);
});
