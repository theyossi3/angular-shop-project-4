const express = require("express");
const ordermodel = require("../models/order-model");
const order_dal = require("../data-access-layer/order-dal");
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const os = require('os');
const path = require('path');
router.get("/getallorder", async (request, response) => {
    try {
        const allorders = await order_dal.allorders()
        allorders.payment = "";
        response.json(allorders);
    } catch (err) {
        response.status(500).send(err.message);
    }

});
router.get("/getallorderbyid/:id", async (request, response) => {
    try {

        const _id = request.params.id;
        const allordersbyid = await order_dal.ordersbyuserid(_id)
        response.json(allordersbyid);
    } catch (err) {
        response.status(500).send(err.message);
    }
});
router.post("/creat", async (request, response) => {
    const order = new ordermodel(request.body);
    try {
        const orderdata = await order_dal.creatorder(order);

        if (orderdata == false) {
            response.status(500).send("order as alredy been creatde");

        } else {
            response.json(orderdata);
        }
    } catch (err) {

        response.status(500).send(err.message);
    }

});
router.post("/orderpdf", async (request, response) => {
    try {
        const date = new Date;
        const cart = request.body;
        var i = 130;
        var l = 25;
        const desktopDir = path.join(os.homedir(), "Desktop");

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`${desktopDir}/receit.pdf`));
        doc
            .fontSize(15)
            .text(`Yossi shop`, 10, 50);
        doc
            .fontSize(15)
            .text(`cart id: ${cart._id}`, 100, 120);
        doc.text(``, 100, 130);
        for (let a of cart.cartProducts) {
            doc
                .fontSize(10)
                .text(`barcode: ${a.product.id} name:${a.product.name} amount:${a.quant} price:${a.totalPrice} `, 100, i += l);
        }

        doc
            .fontSize(15)
            .text(`thank you come again`, 100, i += l);
        doc.end();
    } catch (err) {
        response.status(500).send(err.message);
    }
});
router.get("/ordercunt", async (request, response) => {
    try {
        const cunt = await order_dal.orderscout()
        response.json(cunt);
    } catch (err) {
        response.status(500).send(err.message);
    }
});
module.exports = router;