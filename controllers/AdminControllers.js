const UserModel = require("../model/UserModel");

const getCustomers = async (req, res) => {
  try {
    const customers = await UserModel.find({ role: "customer" });
    res.json({
      customers
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching customers"
    });
  }
};

//  DELETE customer
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.json({
      message: "Customer deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting customer"
    });
  }
};

// UPDATE customer
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      req.body,
      //{ new: true }
      {returnDocument: after}
    );

    res.json({
      message: "Customer updated successfully",
      customer: updatedUser
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating customer"
    });
  }
};

module.exports = {
  getCustomers,
  deleteCustomer,
  updateCustomer
};