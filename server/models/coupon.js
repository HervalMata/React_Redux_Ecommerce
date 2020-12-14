const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: "Nome é requerido",
        minlength: [2, "Muito curto"],
        maxlength: [32, "Muito longa"],
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Coupon", couponSchema);