const ProductModel = require("../model/ProductModel");
//GET
const getAllProducts = async (req, res) => {
  try {
    let products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
//ADD
// const addProduct = async (req, res) => {
//   try {
//     let result = await ProductModel.create(req.body);
//     res.status(201).json({
//       message: "Product added",
//       data: result
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };


const addProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    let result = await ProductModel.create({
      ...req.body,
      image: imagePath
    });

    res.status(201).json({
      message: "Product added",
      data: result
    });
  }
   catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
//EDIT
const editProduct = async (req, res) => {
  try {
    let updated = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   
    );

    res.json({
      message: "Product updated",
      data: updated
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
//DELETE
const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted"
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct
};