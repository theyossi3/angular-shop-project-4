const runSQL = require("./db-access");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("./mongodb-access");

// NEED TO REMOVE 'database'
const ProductModel = require("../models/product-model"); // mongoose ProductModel
const CategoryModel = require("../models/category-model");

async function getAllProducts() {
    // Ignore virtual fields, except for default ones, such as 'id'
    // return await ProductModel.find().exec();

    // Fill virtual field 'category' with the relevant model, in this case "CategoryModel"
    return await ProductModel.find().populate("category").exec();
}

async function getOneProduct(productId) {
    const product = await ProductModel.findById(productId).populate("category").exec();

    return product;
}

async function updateProduct(product, image) {

    // Save the image to disk:
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = product.id + extension; // '99.JPG'
        product.imageName = fileName;

        // Save file to a dedicated folder 'C:/...../data-access-layer/../images/products/99.JPG'
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        image.mv(absolutePath); // Save the file to the path
    }

    const result = await ProductModel.updateOne({ _id: product._id }, product).exec();

    // Check if the id was not found, if so, return null
    if (result.matchedCount === 0) {
        return null;
    } else {
        // Check if data was changed
        if (result.modifiedCount === 0) {
            // Do nothing
        }

        return product;
    }
}

async function patchProduct(productId, changes, image) {

    // Add 'image' handling functionality - TODO
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = productId + extension; // '99.JPG'
        changes.imageName = fileName;

        // Save file to a dedicated folder 'C:/...../data-access-layer/../images/products/99.JPG'
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        image.mv(absolutePath); // Save the file to the path
    }

    const updatedProduct = await ProductModel.updateOne({ _id: productId }, { $set: changes }).exec();

    return updatedProduct;
}

async function addProduct(product, image) {

    // Save the image to disk:
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = product.id + extension; // '99.JPG'
        product.imageName = fileName;

        // Save file to a dedicated folder 'C:/...../data-access-layer/../images/products/99.JPG'
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        await image.mv(absolutePath); // Save the file to the path
    }

    product.save();

    // 3. Return new product
    return product;
}

async function getProductsByRange(min, max) {
    const products = await ProductModel.find({ price: { $gte: min, $lte: max } }).exec();

    return products;
}

function getProductImage(imageName) {
    let absolutePath = path.join(__dirname, "..", "images", "products", imageName);
    if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "images", "not-found.jpg");
    }

    return absolutePath;
}

async function deleteProduct(_id) {
    const result = await ProductModel.deleteOne({ _id }).exec();

    // console.log(result);

    return result.deletedCount === 1 ? true : false;

    // const fileName = id + ".jpg";
    // const absolutePath = path.join(__dirname, "..", "images", "products", fileName);

    // try {
    //     if(fs.existsSync(absolutePath)) {
    //         fs.unlinkSync(absolutePath);
    //     }
    // } catch(err) {
    //     console.log(err);
    // }

    return true;
}

// Get all categories
 

module.exports = {
    getOneProduct,
    addProduct,
    getAllProducts,
    updateProduct,
    getProductsByRange,
    getProductImage,
    deleteProduct,
    patchProduct,
 
}