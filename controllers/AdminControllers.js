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

module.exports = {
  getCustomers
};