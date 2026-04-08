let express = require("express");
const {registerCustomer,loginCustomer, getCustomerProfile} = require("../controllers/CustomerControllers");
const { customerAuth } = require("../Middleware/auth");
 let router = express.Router();

 router.get("/", (req, res) => {
   res.send("customer route!!!");
 });

 router.post("/register", registerCustomer);
 router.post("/login", loginCustomer);
router.get("/profile", customerAuth, getCustomerProfile);

module.exports = router;

