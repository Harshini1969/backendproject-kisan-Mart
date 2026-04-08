const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

//ADMIN AUTH

async function adminAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Not Authorized: Admin only" });
    }

    req.userId = decoded.id;

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

//CUSTOMER AUTH

async function customerAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user || user.role !== "customer") {
      return res.status(403).json({ message: "Not Authorized: Customers only" });
    }

    req.userId = decoded.id; 

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { adminAuth, customerAuth };