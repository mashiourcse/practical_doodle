const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");
const commentSchema = mongoose.Schema({
    blogId: {
        type: Number,
        required: true,
    },
    id: {
        type: Number, // Assuming you want to use UUIDs as the type for id
        default: uuidv4,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Comment", commentSchema);
