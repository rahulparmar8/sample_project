import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String },
    desc: { type: String },
    image: { type: String },
    parent: { type: Number, enum: [0, 1], default: 0 },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;