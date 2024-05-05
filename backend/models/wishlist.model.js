const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema(
  {
    id: { type: String, default: null },
    userid: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const reviewSchema = new Schema(
  { 
    id: { type: String, required: true },
    product_id: { type: String, required: true },
    userid: { type: String, required: true },
    content : { type: String, required: true },
    rating : { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);
const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;
