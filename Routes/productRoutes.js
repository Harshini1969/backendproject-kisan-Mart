const express = require("express");
const {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct
} = require("../controllers/ProductControllers");

let router = express.Router();

router.get("/getAll", getAllProducts);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;