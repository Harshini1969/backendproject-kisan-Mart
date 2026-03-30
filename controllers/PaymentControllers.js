const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
  try {
    
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Payment order failed" });
  }
};

