const express = require("express");
const { getAllProducts, addProduct, deleteProduct, updateQuantity } = require("../controllers/CartControllers");
const { customerAuth } = require("../Middleware/auth");

let router = express.Router();

router.get("/getAll", customerAuth, getAllProducts);
router.post("/add", customerAuth, addProduct);
router.delete("/delete/:id", customerAuth, deleteProduct);
router.put("/update/:id", customerAuth, updateQuantity);

module.exports = router;