global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const server = express();
const authController = require("./controllers/auth-controller");
const productsController = require("./controllers/products-controller");
const customersController = require("./controllers/customer-controller");
const orderController = require("./controllers/order-controller");
const fileUpload = require("express-fileupload");
const path = require("path");

server.use(cors());
server.use(express.json());
server.use(fileUpload());
server.use(express.static(__dirname + "/frontend"));
server.use("/api/auth", authController);
server.use(express.static(path.join(__dirname, "./frontend")));
server.use("/api/products", productsController);
server.use("/api/customer", customersController);
server.use("/api/order", orderController);
server.use("*", (request, response) => {
  response.status(404).send("Route not found");
});

const port = process.env.PORT || 3001
const expressListener = server.listen(port, () => console.log("Listening..."));