const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		per: { type: String, required: true },
		seller_mobile_number: { type: Number, required: true },
		product_image_url: { type: String, required: true },
		city: { type: String, required: true },
		userid: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
