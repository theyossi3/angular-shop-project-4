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
        
        for (let i of products) {
            const newProduct = await ProductModel.findOneAndUpdate(
                {"name": i.ProductName},
                {$set: {"imageName": i.ProductID + ".jpg"}},
                {returnNewDocument: true}
                ).exec();
        }
    } catch(err) {
        console.log(err);
    }
}

startApp();