const runSQL = require("./db-access");
const crypto = require("../helpers/crypto-helper");
const uuid = require("uuid");
const CategoryModel = require("../models/category-model");

async function addcategory(categoryModel) {
    return categoryModel.save();

}

async function getAllCategories() {
    const a = await CategoryModel.find().exec();
    return a;
}


module.exports = {
    getAllCategories,
    addcategory
}