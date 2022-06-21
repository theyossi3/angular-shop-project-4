const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema({
    Productid: {
        type: String,
        required: false,
        min: 2,
        max: 20
    },
    cartProducts: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quant: Number,
        totalPrice: Number
    }],

    totalprice: {
        type: Number,
        required: false,
        min: 2,
        max: 20
    },

}, { versionKey: false, toJSON: { virtuals: true } });
CartItemSchema.virtual("Cart", {
    localField: "cartId",
    ref: "CartModel",
    foreignField: "_id",
    justOne: true
});


const CartModel = mongoose.model("CartItemmodel", CartItemSchema, "Cartitem");

module.exports = CartModel;