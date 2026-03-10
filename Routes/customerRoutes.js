let express = require("express");
const customerModel = require("../model/UserModel");
let jwt = require("jsonwebtoken");

let router = express.Router();

router.get("/", (req, res) => {
  res.send("customer route!!!");
});

router.post("/register", async (req, res) => {
  let data = req.body;
  data.role="customer";

  try {
    let result = await customerModel.findOne({ email: data.email });

    if (result) {
      res.status(400).json({
        message: "email already exists!!"
      });
      return;
    }

    result = await customerModel.create(data);

    res.status(200).json({
      message: "Successfully registered"
    });

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong please try again later"
    });
  }
});

router.post("/login", async (req, res) => {
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
});

module.exports = router;