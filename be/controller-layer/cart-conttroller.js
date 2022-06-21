const express = require("express");
//const Verify = require("../helpers/verify-logged-in");
const cart_dal = require("../data-access-layer/cart-dal")

const router = express.Router();

router.patch("/remove/:cartid/:index", async (request, response) => {
    try {
        const product = request.body;
        const arrayindex = request.params.index;
        const cartid = request.params.cartid;

        const cartitamsdata = await cart_dal.removeitemcart(cartid, arrayindex, product);
        response.json(cartitamsdata);

    } catch (err) {

        response.status(500).send(err.message);
    }
});

router.post("/update/:cartid", async (request, response) => {
    try {
        const product = request.body;
        const cartid = request.params.cartid;
        const cartitamsdata = await cart_dal.updatecart(cartid, product);
        response.json(cartitamsdata);

    } catch (err) {

        response.status(500).send(err.message);
    }
});

router.get("/:id", async (request, response) => {
    try {
        const userid = request.params.userid;
        const allcartdata = await cart_dal.getcartbyid(userid);
        response.json(allcartdata);

    } catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/checkcart/:userid", async (request, response) => {
    try {
        const userid = request.params.userid;
        const cartdata = await cart_dal.checkcart(userid);
        response.json(cartdata);

    } catch (err) {
        response.status(500).send(err.message);
    }
});
router.get("/getallcartitem/:cartid", async (request, response) => {
    try {
        const cartid = request.params.cartid;
        const cartitamsdata = await cart_dal.getallcartitem(cartid);
        response.json(cartitamsdata);

    } catch (err) {
        response.status(500).send(err.message);
    }
});
router.post("/addcartitem/:cartid", async (request, response) => {
    try {
        const product = request.body;
        const cartid = request.params.cartid;
        const cartitamsdata = await cart_dal.additemtocart(cartid, product);

        response.json(cartitamsdata);

    } catch (err) {

        response.status(500).send(err.message);
    }
});
module.exports = router;