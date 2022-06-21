global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const product_controller = require("./controller-layer/product-controller");
const auth_controller = require("./controller-layer/auth-controller");
const cart_controller = require("./controller-layer/cart-conttroller");
const order_controller = require("./controller-layer/order-conttroller");
const categories_controller = require("./controller-layer/categories-controller");
const log = require("./middleware/logger");
const preventDelete = require("./middleware/prevent-delete");
const fileUpload = require("express-fileupload");
const verifyLoggedIn = require("./middleware/verify-logged-in");
const expressJwt = require('express-jwt');
// 1. Create REST API server
const server = express();
// server.use(cors({origin: ["http://localhost:4200/", "http://cnn.com/"]}));
server.use(cors());
server.use(fileUpload());

// server.use(log);
// server.use(preventDelete);

// 2. Configure REQUEST parser to use JSON (PARSER that automaticlaly parses JSON into JS objects)
server.use(express.json()); // REST API works with JSON 
// server.use(express.urlencoded({extended: true})); // HTML Form submit

server.use((err, request, response, next) => {
    response.status(err.status).send(err.message);
});

server.use("/token/verify", verifyLoggedIn, (request, response) => {

});

server.use("/api/cart", cart_controller)
server.use("/api/auth", auth_controller);
server.use("/api/products", product_controller);
server.use("/api/order", order_controller);
server.use("/api/categories", categories_controller)

    ;

server.use("*", (request, response) => {
    response.status(404).send("Route not found.");
});

// 4. Open server for client requests using a specific port
server.listen(3030, () => console.log("Server is listening..."));

function getNewId(database) {
    return database.length + 1;
}