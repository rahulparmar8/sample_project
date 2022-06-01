import express from "express";
import path from "path";
import mongoose from "mongoose";
import productRoutes from "./routes/produtRoutes";
import bodyParser from "body-parser";
import session from "express-session";

const app = express();
const port = 3000;
const DATABASE_URL = "mongodb://localhost:27017/node_practice";

const multer = require('multer')
const upload = multer({ dest: "../uploads" });


// Session //
app.use(
  session({
      secret: "imkey",
      resave: false,
      saveUninitialized: true,
  })
);


app.use(express.static("build"));
app.use(express.static("uploads"));
app.use(express.static(path.join(__dirname, "build/uploads")));
// app.use(express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "build/files")));


// set Template Enging //
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// console.log(__dirname);

app.use(express.json());
app.use(bodyParser.json());
// body parts middleware //
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/product", productRoutes);

// Database connection //
mongoose.connect(`mongodb://localhost:27017/node_practice`).then(() => {
  console.log("connected Database");
});
app.listen(port, () => {
  console.log(`Server is runing... ${port}`);
});
