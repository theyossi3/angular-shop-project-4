const jwt = require("jsonwebtoken");
const crypto = require("../helpers/crypto-helper");
const uuid = require("uuid");
const OrderModel = require("../models/order-model");
const cart_dal = require("../data-access-layer/cart-dal");

async function ordersbyuserid(id) {
    const order = await OrderModel.find({ "userid ": id }).exec();
    order.payment = "";
    return order;
}
async function orderscout() {

    const order = await OrderModel.count().exec();
    return order;
}
async function allorders() {

    return OrderModel.find().exec();
}

async function creatorder(order) {
    let i = await cart_dal.checkcartstate(order.cartid)

    if (i) {

        order.ordercreatedate = new Date;
        cart_dal.closecart(order.cartid, order.totalprice);
        return order.save();
    }

    else {
        return false;
    }
}

module.exports = {
    creatorder,
    ordersbyuserid,
    allorders,
    orderscout
}