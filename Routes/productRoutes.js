const express = require("express");
const {getAllProducts, addProduct,editProduct,deleteProduct} = require("../controllers/ProductControllers");
const { adminAuth } = require("../Middleware/auth");
const upload = require("../config/multer");

let router = express.Router();

router.get("/getAll", getAllProducts);
// router.post("/add", adminAuth, addProduct);
router.post("/add", adminAuth, upload.array("images",5), addProduct);
router.put("/edit/:id", adminAuth, editProduct);
router.delete("/delete/:id", adminAuth, deleteProduct);

module.exports = router;