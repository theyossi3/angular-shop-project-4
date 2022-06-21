const mongoose = require("mongoose");
const ProductModel = require("./product-model");
const products = require("./products.json");

function connectAsync() {
    return new Promise((resolve, reject) => {

        // Connect options - prevent console warnings:
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        // Connect to MongoDB:
        mongoose.connect("mongodb://localhost:27017/Northwind", options, (err, db) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

async function startApp() {
    try {
        const db = await connectAsync();

        const newProducts = await ProductModel.find({"imageName": null}).exec();
        for (let i of newProducts) {
            const newProduct = await ProductModel.findByIdAndUpdate(
                {"_id": i._id},
                {$set: {"imageName": i._id + ".jpg"}}).exec();
        }
    } catch(err) {
        console.log(err);
    }
}

startApp();