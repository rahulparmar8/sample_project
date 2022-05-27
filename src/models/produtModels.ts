import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String },
    desc: { type: String },
    price: { type: String },
    discount: { type: Number },
    image: { type: String },
});

const productModel = mongoose.model("product", productSchema);

export default productModel;