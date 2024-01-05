const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authentication");

const createdProduct = require("../controllers/productController/createProduct");
const {
  getProductByFilter,
  getProductById,
} = require("../controllers/productController/getProduct");
const updateProduct = require("../controllers/productController/updateProduct");
const delProduct = require("../controllers/productController/deleteProduct");

Router.post("/authorized/:userId/create/product", authentication, createdProduct);
Router.get("/products", getProductByFilter);
Router.get("/products/:productId", getProductById);
Router.put("/authorized/:userId/products/:productId", authentication, updateProduct);
Router.delete("/authorized/:userId/products/:productId", authentication, delProduct);

module.exports = Router;
