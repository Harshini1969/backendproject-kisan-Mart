const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  },
  count: {
    type: Number,
    default: 1
  }
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;