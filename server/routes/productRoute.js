const express = require("express");
const router = express.Router();
const {
  getProduct,
  getProductById,
} = require("../controller/productController");
//get all product from DB
router.get("/", getProduct);

//get single product from DB
router.get("/:id", getProductById);

module.exports = router;
