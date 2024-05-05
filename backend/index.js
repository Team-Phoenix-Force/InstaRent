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

const port = process.env.PORT || 7000;
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

app.use("/messages", messageRoutes);
app.use("/users", usersRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/products", productRoutes);
