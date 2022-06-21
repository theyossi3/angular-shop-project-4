const mongoose = require("mongoose");
const CartModel = require("../models/cart-model");
const UsersModel = require("../models/user-model");
const { ObjectId } = mongoose.Schema;
const OrderSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, ref: "users",
        type: ObjectId,
        ref: "UsersModel",
        require: true
    },
    cartid: {
        type: mongoose.Schema.Types.ObjectId, ref: "Cart",
        ref: "CartModel",
        required: true
    },
    totalprudacts: {
        type: Number,
        required: true,
    },
    totalprice: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
        min: 2,
        max: 20
    }
    , addres: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    deliverydate: {
        type: Date,
        required: true,
    },
    ordercreatedate: {
        type: Date,
        required: true,
    },
    payment: {
        type: Number,
        required: true,
        min: 6,

    },


}, { versionKey: false, toJSON: { virtuals: true } });

const OrderModel = mongoose.model("OrderModel", OrderSchema, "Order");

module.exports = OrderModel;