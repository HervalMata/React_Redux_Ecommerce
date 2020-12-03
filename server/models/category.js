const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Nome é requerido",
        minlength: [2, "Muito curto"],
        maxlength: [32, "Muito longa"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);