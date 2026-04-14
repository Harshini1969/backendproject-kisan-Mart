const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  name: String,
  price: Number,
  unit: String,
  quantity: Number,
  isOrganic: Boolean,
  images: [String]
});

let ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;