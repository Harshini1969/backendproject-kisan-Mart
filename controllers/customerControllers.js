const customerModel = require("../model/UserModel");
let jwt = require("jsonwebtoken");

const registerCustomer = async (req, res) => {
  let data = req.body;
  data.role = "customer";

  try {
    let result = await customerModel.findOne({ email: data.email });

    if (result) {
      return res.status(400).json({
        message: "email already exists!!"
      });
    }

    await customerModel.create(data);

    res.status(200).json({
      message: "Successfully registered"
    });

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong please try again later"
    });
  }
};

const loginCustomer = async (req, res) => {
  let data = req.body;

  try {
    let result = await customerModel.findOne({
      email: data.email,
      password: data.password
    });

    if (!result) {
      return res.status(401).json({
        message: "Invalid details"
      });
    }

    let token = jwt.sign(
      { id: result._id, role: result.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token
    });

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong please try again later"
    });
  }
};

const getCustomerProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    console.log("USER ID:", req.userId);

     console.log("USER DATA:", res.data);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
};


module.exports = {
  registerCustomer,
  loginCustomer,
  getCustomerProfile
};