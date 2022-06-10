import mongoose from "mongoose";

const session = new mongoose.Schema({
    key: { type: String },
    value: { type: String }
})

// Model
const SessionModel = mongoose.model("session", session);

export default SessionModel;