import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    completed: {
        type: bool,
        required : true,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "user",
        required: true,
    },
    createdAt: {
        type: Date,
        required : true,
        default: Date.now()
    }
});

export const task = mongoose.model("task", taskSchema);