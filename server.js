const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
let customerRoutes = require("./routes/customerRoutes");
let adminRoutes = require("./Routes/adminRoutes");
let productRoutes = require("./Routes/productRoutes");

require("dotenv").config();

let app = express();

connection();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/customer", customerRoutes);
app.use("/admin", adminRoutes); 
app.use("/product",productRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running in port 5000");
});