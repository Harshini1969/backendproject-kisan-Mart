const express = require("express");
const { adminAuth } = require("../Middleware/auth");
const { getCustomers, deleteCustomer,updateCustomer} = require("../controllers/AdminControllers");

const router = express.Router();

router.get("/customers", adminAuth, getCustomers);
router.delete("/customer/:id", deleteCustomer);
router.put("/customer/:id", updateCustomer);

module.exports = router;