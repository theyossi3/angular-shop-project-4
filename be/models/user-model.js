const mongoose = require("mongoose");

// 1. Define schema (ProductModel properties + DB field definitions / structure)
// 2. Add validations to the schema
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 10
    },
    token:{ type: String},
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 10
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 10
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 12
    },
    city: {
        type: String,
        required: false,
        min: 2,
        max: 20
    }
    , addres: {
        type: String,
        required: false,
        min: 2,
        max: 20
    },
    isAdmin: {
        type: Boolean,
        required: false,
        min: 2,
        max: 20
    },
}, { versionKey: false, toJSON: { virtuals: true } });

// 3. Create Mongoose Model with scheme defined above
const UserModel = mongoose.model("UserModel", UserSchema, "users");

// 4. Return Mongoose Model (module.exports)
module.exports = UserModel;