import mongoose from "mongoose";

const catgrorySchema = new mongoose.Schema({
    name: { type: String },
    desc: { type: String },
    image: { type: String },
}, {
    timestamps: true
});

const catgoryModel = mongoose.model("catgory", catgrorySchema);

export default catgoryModel;