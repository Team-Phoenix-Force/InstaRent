require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messages");
const usersRoutes = require("./routes/users");
const wishlistRoutes = require("./routes/wishlist");
const productRoutes = require("./routes/product");
const Product = require("./models/product.model");
let Wishlist = require("./models/wishlist.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");


const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
const corsOptions = {
  origin: "http://localhost:5173", // to allow requests from client at port 5173
  credentials: true, // to allow cookies from client
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });
});

app.post("/showWishlist", async (req, res) => {
  try {
    const userId = req.body.userid;
    const wishlistItems = await Wishlist.find({ userid: userId });

    if (wishlistItems.length > 0) {
      const productIds = wishlistItems.map((item) => item.id);
      const products = await Product.find({ _id: { $in: productIds } });
      return res.json(products);
    } else {
      return res.json([]);
    }
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Error getting wishlist items. Try later",
      status: false,
    });
  }
});

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: 'rzp_test_zRrOrFkl00ULTN',
      key_secret: 'RySzYJX4VGAvbmlFfgUvMItN',
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});
app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});


app.use("/messages", messageRoutes);
app.use("/users", usersRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/products", productRoutes);


