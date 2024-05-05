const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		id: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		product_image_url: { type: String, required: true },
		address: { type: String, required: true },
		userid: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
