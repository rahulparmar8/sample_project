import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String },
    desc: { type: String },
    price: { type: String },
    cat_id: { type: Schema.Types.ObjectId, ref: "Category" },
    discount: { type: Number },
    image: { type: String },
    status: { type: Number, enum: [0, 1], default: 1 },

}, {
    timestamps: true
});

const productModel = mongoose.model("product", productSchema);

export default productModel;