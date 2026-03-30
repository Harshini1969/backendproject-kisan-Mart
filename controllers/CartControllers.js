
const CartModel = require("../model/CartModel");

//GET PRODUCT

const getAllProducts = async(req,res)=>{
  try {
    const products = await CartModel.find().populate("productId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ADD PRODUCT

const addProduct = async(req,res)=>{
  try {
    const {productId,count} = req.body;
    let existing = await CartModel.findOne({ productId });

    if (existing) {
      existing.count += count || 1;
      await existing.save();

      return res.json({
        message: "Product quantity updated",
        data: existing,
      });
    }

    const result = await CartModel.create({
      productId,
      count: count || 1,
    });

    res.status(201).json({
      message: "Product added",
      data: result,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


//  DELETE
const deleteProduct = async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted",
    });

  } catch (err) {
    res.status(500).json({
         message: "Server Error" 
        });
  }
};

 //UPDATE QUANTITY 

const updateQuantity = async (req, res) => {
      try {
        const { count } = req.body;

        const updated = await CartModel.findByIdAndUpdate(
          req.params.id,
          { count },
          // { new: true }
          { returnDocument: 'after' }
        ).populate("productId");

        res.json({
          message: "Quantity updated",
          data: updated,
        });

      } catch (err) {
            res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateQuantity, 
};