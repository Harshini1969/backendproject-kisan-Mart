const CartModel = require("../model/CartModel");
const ProductModel = require("../model/ProductModel");

// GET USERS CART
const getAllProducts = async (req, res) => {
  try {
    const products = await CartModel.find({ userId: req.userId }).populate("productId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ADD PRODUCT 
const addProduct = async (req, res) => {
  try {
    const { productId, count } = req.body;
    const userId = req.userId;
    const product = await ProductModel.findById(productId);
    if (!product || product.quantity <= 0) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    let existing = await CartModel.findOne({ productId, userId });

    if (existing) {
      existing.count += count || 1;
      await existing.save();
      return res.json({ message: "Quantity updated", data: existing });
    }

    const result = await CartModel.create({
      productId,
      userId,
      count: count || 1,
    });

    res.status(201).json({ message: "Product added to cart", data: result });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE QUANTITY
const updateQuantity = async (req, res) => {
  try {
    const { count, operation } = req.body; 
    let cartItem = await CartModel.findOne({ _id: req.params.id, userId: req.userId });

    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    if (operation === "dec") {
      cartItem.count = Math.max(1, cartItem.count - 1);
    } else if (operation === "inc") {
      cartItem.count += 1;
    } else if (count) {
      cartItem.count = count;
    }

    await cartItem.save();
    res.json({ message: "Quantity updated", data: cartItem });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
  
    const result = await CartModel.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!result) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Product removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllProducts, addProduct, deleteProduct, updateQuantity };