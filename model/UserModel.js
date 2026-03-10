const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
  role: String
});

let userModel = mongoose.model("user", userSchema);

module.exports = userModel;