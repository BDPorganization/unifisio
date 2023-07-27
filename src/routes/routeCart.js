const cart = require("express").Router();
const { listCart, adcItemCart, excludeItemCart, excludeAllCart } = require("../controller/cartController.js");

cart.get("/listCart", listCart);
cart.post("/addCart", adcItemCart);
cart.delete("/deleteItemCart", excludeItemCart);
cart.delete("/deleteAllCart", excludeAllCart);

module.exports = cart;