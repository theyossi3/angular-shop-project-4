const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userid: {
        type: String,
        require: true
    },
    creationdate: {
        type: Date,
        required: false,

    },
    cartProducts: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quant: Number,
        totalPrice: Number
    }],
    isactive: {
        type: Boolean,
        required: false,
        min: 2,
        max: 20
    },
    overallPrice: {
        type: Number,
        required: false,
    }
}, { versionKey: false, toJSON: { virtuals: true } });

// Virtual Field


const CartModel = mongoose.model("CartModel", CartSchema, "Cart");

module.exports = CartModel;