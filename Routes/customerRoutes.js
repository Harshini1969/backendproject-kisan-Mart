let express = require("express");
const {
  registerCustomer,
  loginCustomer
} = require("../controllers/CustomerControllers");

let router = express.Router();

router.get("/", (req, res) => {
  res.send("customer route!!!");
});

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

module.exports = router;