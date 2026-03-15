const express = require("express");
const router = express.Router();
const UserModel = require("../model/UserModel");
const { adminAuth } = require("../Middleware/auth");

router.get("/customers",adminAuth,async(req, res)=>{
  try {
    const customers = await UserModel.find({ role: "customer" });
     res.json({
        customers
     });
  } 
  catch (err) {
    res.status(500).json({
      message: "Error fetching customers"
    });
  }
});

module.exports = router;