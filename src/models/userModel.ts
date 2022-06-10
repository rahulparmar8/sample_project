import mongoose, { Schema } from "mongoose";

export interface User {
    _id?: string;
    name?: string;
    email?: string;
    mob?: number;
    password?: string;
    status?: string;
}

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: false },
    mob: { type: String },
    password: { type: String },
    image: { type: String },
    emailToken: { type: String },
    emailVerification: { type: Boolean },
    status: { type: Number, enum: [0, 1], default: 1 },
}, {
    timestamps: true
});

const userModel = mongoose.model("users", userSchema);

export default userModel;