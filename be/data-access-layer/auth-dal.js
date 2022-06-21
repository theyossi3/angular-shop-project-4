const jwt = require("jsonwebtoken");
const crypto = require("../helpers/crypto-helper");
const uuid = require("uuid");
const UserModel = require("../models/user-model");

async function login(user) {
    /// ---- DAL ----
    // X. Encrypt password using HASHING
    user.password = crypto.hash(user.password);
    user.email = user.email.toUpperCase()
    const loggedInUser = await UserModel.findOne({ email: user.email, password: user.password }).exec();
    if (!loggedInUser) {
        return null;
    }

    loggedInUser.token = jwt.sign({ loggedInUser }, "config.jwtKe", { expiresIn: "30m" });

    // 6. Remove password from UserModel
    loggedInUser.password = "";

    // 7. Return UserModel to Controller
    return loggedInUser;
}

async function register(user) {
    /// ---- DAL ----
    // X. Encrypt password using HASHING

    //If admin change to true
    user.isAdmin = false;
    user.email = user.email.toUpperCase()
    const emailcheck = await UserModel.findOne({ email: user.email }).exec();


    if (!emailcheck) {
        // X. Encrypt password using HASHING
        user.password = crypto.hash(user.password);

        user.save();

        // 5. Create Token and add to 'UserModel'
        user.token = jwt.sign({ user }, "SuchAPerfectDay", { expiresIn: "30m" });

        // 6. Remove password from UserModel
        delete user.password;
        // 7. Return UserModel to Controller
        return user;
    }
    return "email in use";
}

module.exports = {
    login,
    register
}