const express = require("express");
//const Verify = require("../helpers/verify-logged-in");
const categories_dal = require("../data-access-layer/categories-dal");
const categorymodel = require("../models/category-model");
const router = express.Router();


router.post("/add", async (request, response) => {
    try {
        const orderModel = new categorymodel(request.body);
        const newcategory = await categories_dal.addcategory(orderModel)
        response.status(201).json(newcategory);
    } catch (err) {
        response.status(400).send(err);
    }
});

router.get("/allcategories", async (request, response) => {
    try {
        const categories = await categories_dal.getAllCategories();
       
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;