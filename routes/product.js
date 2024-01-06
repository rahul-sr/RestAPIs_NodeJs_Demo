const express = require("express");
const { products, roles } = require("../data");
const allowRoles = require("../authorization");
const router = express.Router();

// GET List of Products
router.get("/", allowRoles([roles.ADMIN, roles.MEMBER]), (req, res) => {
  res.json(products);
});

// GET A Specific Product
router.get("/:productId", (req, res) => {
  let product = products.find((product) => product.id == req.params.productId);
  res.json(product);
});

// POST Create a product
router.post("/", allowRoles([roles.ADMIN]), (req, res) => {
  const product = req.body;
  console.log(product);
  //   if(!product.name || !product.brand) {
  //     res.status(400)
  //   }
  let newProduct = {
    id: randomUUID(),
    brand: product.brand,
    name: product.name,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT: Update the product
router.put("/:productId", (req, res) => {
  const productId = req.params.productId;
  const productIndex = products.findIndex((product) => product.id === productId);
  let existingProduct = products[productIndex];
  let updatedProduct = {
    id: existingProduct.id,
    brand: req.body.brand,
    name: req.body.name,
  };
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

router.delete("/:productId", (req, res) => {
  const productId = req.params.productId;
  try {
    products = products.filter((product) => product.id !== productId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error occured");
  }
});

module.exports = router;
