const express = require("express");
const {getAllProducts,addProduct,deleteProduct,updateQuantity} = require("../controllers/CartControllers");

let router = express.Router();

router.get("/getAll", getAllProducts);
router.post("/add", addProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateQuantity);

module.exports = router;