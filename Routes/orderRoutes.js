const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderControllers");
const { customerAuth, adminAuth } = require("../Middleware/auth");

router.post("/save", customerAuth, orderController.saveOrder);
router.get("/", customerAuth, orderController.getCustomerOrders);
router.get("/getAll", adminAuth, orderController.getAllOrdersAdmin);
router.put("/update/:id", adminAuth, orderController.updateOrderStatus);

module.exports = router;