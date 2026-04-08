const OrdersModel = require("../model/OrdersModel");
const CartModel = require("../model/CartModel");
const ProductModel = require("../model/ProductModel");


// SAVE NEW ORDER
const saveOrder = async (req, res) => {

  try {

    const data = req.body;
    const userId = req.userId;

    if (!data.products || data.products.length === 0) {
      return res.status(400).json({
        message: "No products in order"
      });
    }

    // create order
    const newOrder = await OrdersModel.create({
      ...data,
      userId: userId
    });

    // clear cart
    await CartModel.deleteMany({ userId: userId });

    // update stock
    const stockUpdates = data.products.map((item) => {

      if (!item.productId) return null;

      const pId =
        typeof item.productId === "object"
          ? item.productId._id
          : item.productId;

      return ProductModel.findByIdAndUpdate(
        pId,
        { $inc: { quantity: -item.count } },
        { new: true }
      );

    });

    await Promise.all(stockUpdates.filter(Boolean));

    res.status(201).json({
      message: "Order placed successfully",
      orderId: newOrder._id
    });

  } catch (err) {

    console.error("Order Save Error:", err);

    res.status(500).json({
      message: "Server Error: Could not save order"
    });

  }

};


// GET CUSTOMER ORDERS
const getCustomerOrders = async (req, res) => {

  try {

    const result = await OrdersModel.find({ userId: req.userId })
      .populate("products.productId")
      .sort({ date: -1 });

    res.json(result);

  } catch (err) {

    console.error("Fetch Orders Error:", err);

    res.status(500).json({
      message: "Server Error: Could not fetch orders"
    });

  }

};


// GET ALL ORDERS (Admin)
const getAllOrdersAdmin = async (req, res) => {

  try {

    const result = await OrdersModel.find()
      .populate("products.productId")
      .sort({ date: -1 });

    res.json(result);

  } catch (err) {

    console.error("Admin Fetch Error:", err);

    res.status(500).json({
      message: "Server Error: Could not fetch all orders"
    });

  }

};

// UPDATE ORDER STATUS (Admin)

const updateOrderStatus = async (req, res) => {
  try {
    const data = req.body;

    // console.log("Update data:", data);

    const result = await OrdersModel.findByIdAndUpdate(
      req.params.id,
      { ...data },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(result);

  } catch (err) {

    console.error("Order Update Error:", err);

    res.status(500).json({
      message: "Server Error: Could not update order"
    });

  }
};

module.exports = {
  saveOrder,
  getCustomerOrders,
  getAllOrdersAdmin,
  updateOrderStatus
};