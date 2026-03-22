const express = require("express");
const { adminAuth } = require("../Middleware/auth");
const { getCustomers } = require("../controllers/AdminControllers");

const router = express.Router();

router.get("/customers", adminAuth, getCustomers);

module.exports = router;