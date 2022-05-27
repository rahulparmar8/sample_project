import express from "express";
import path from "path";
import mongoose from "mongoose";
import productRoutes from "./routes/produtRoutes"
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const DATABASE_URL = "mongodb://localhost:27017/node_practice";


// set Template Enging //
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// console.log(__dirname);


app.use(express.json())
app.use(bodyParser.json())
// body parts middleware //
app.use(bodyParser.urlencoded({ extended: false }));




app.use("/product", productRoutes);


// Database connection //
mongoose.connect(`mongodb://localhost:27017/node_practice`).then(() => {
    console.log("connected Database");
})
app.listen(port, () => {
    console.log(`Server is runing... ${port}`);
});