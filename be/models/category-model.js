const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: String,
}, { versionKey: false, toJSON: { virtuals: true } });

CategorySchema.virtual("products", {
    localField: "_id", // relation's local field
    ref: "ProductModel", // Model?
    foreignField: "categoryId" // relation's foreign field
});

const CategoryModel = mongoose.model("CategoryModel", CategorySchema, "categories");

module.exports = CategoryModel;
