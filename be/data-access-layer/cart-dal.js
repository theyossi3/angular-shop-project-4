const runSQL = require("./db-access");
const crypto = require("../helpers/crypto-helper");
const uuid = require("uuid");
const CartModel = require("../models/cart-model");


async function removeitemcart(cartid, arrayindex, product) {

    await CartModel.updateOne({ "_id": cartid }, { $pull: { "cartProducts": { "product": product.product.id } } }).populate("Cart").exec();

}

async function checkcart(userid) {
    const cartactive = await CartModel.findOne({ userid: userid, isactive: true }).exec();
    if (cartactive) {
        return cartactive
    }
    const cart = new CartModel();
    cart.userid = userid;

    cart.creationdate = Date.now();
    cart.cartProducts[{
    }];
    cart.isactive = true;
    cart.overallPrice = 0;
    cart.save();

    return cart;

}

async function checkcartstate(id) {
    const cartactive = await CartModel.findOne({ "_id": id, isactive: true }).exec();
    if (cartactive == null) {
        return false;

    }
    else {
        return true;


    }
}
async function updatecart(cartid, product) {

    return await CartModel.updateOne({ "_id": cartid, "cartProducts.product": product.product.id }, { $set: { "cartProducts.$.quant": product.quant, "cartProducts.$.totalPrice": product.totalPrice } }).populate("Cart").exec();

}
async function getallcartitem(cartid) {

    return await CartModel.find({ "_id": cartid }).populate("Cart").exec();
}


async function additemtocart(cartid, Product) {


    return await CartModel.updateOne({ "_id": cartid }, { $push: { cartProducts: Product } }).populate("Cart").exec();

}

async function closecart(cartid, price) {

    const a = await CartModel.updateOne({ _id: cartid, }, { "isactive": false, "overallPrice": price }).exec();

}
async function getcartbyid(id) {
    const cartactive = await CartModel.find({ "userid": id }).exec();
}

module.exports = {
    checkcart,
    getallcartitem,
    additemtocart,
    closecart,
    updatecart,
    removeitemcart,
    checkcartstate,
    getcartbyid
}