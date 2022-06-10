import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/produtRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import session from "express-session";

dotenv.config();

const app = express();
const port = 3000;
const DATABASE_URL = "mongodb://localhost:27017/node_practice";



app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

// app.use(
//   session({
//       secret: "imkey",
//       resave: false,
//       saveUninitialized: true,
//   })
// );


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

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/home", (req, res) => {
  res.render("registerPage");
});
app.use("/", userRoutes)
app.use("/product", productRoutes);
app.use("/category", categoryRoutes)


// Database connection //
mongoose.connect(`mongodb://localhost:27017/node_practice`).then(() => {
  console.log("connected Database");
});
app.listen(port, () => {
  console.log(`Server is runing... ${port}`);
});
