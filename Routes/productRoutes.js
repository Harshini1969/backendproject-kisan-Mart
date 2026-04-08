// const express = require("express");
// const {
//   getAllProducts,
//   addProduct,
//   editProduct,
//   deleteProduct
// } = require("../controllers/ProductControllers");

// let router = express.Router();

// router.get("/getAll", getAllProducts);
// router.post("/add", addProduct);
// router.put("/edit/:id", editProduct);
// router.delete("/delete/:id", deleteProduct);

// module.exports = router;

const express = require("express");
const {getAllProducts,
   addProduct,
  editProduct,
  deleteProduct
} = require("../controllers/ProductControllers");

const { adminAuth } = require("../Middleware/auth");

let router = express.Router();

router.get("/getAll", getAllProducts);
router.post("/add", adminAuth, addProduct);
router.put("/edit/:id", adminAuth, editProduct);
router.delete("/delete/:id", adminAuth, deleteProduct);

module.exports = router;