require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/db");

let customerRoutes = require("./Routes/customerRoutes");
let adminRoutes = require("./Routes/adminRoutes");
let productRoutes = require("./Routes/productRoutes");
let cartRoutes = require("./Routes/cartRoutes");
let paymentRoutes = require("./Routes/paymentRoutes");
let orderRoutes = require("./Routes/orderRoutes");

let app = express();

connection();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/customer", customerRoutes);
app.use("/admin", adminRoutes); 
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);
app.use("/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});