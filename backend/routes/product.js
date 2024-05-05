const router = require("express").Router();
const Product = require("../models/product.model");

// GET at products/
// Function to get all products from the database
const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		return res.json(products);
	} catch (error) {
		console.error(error);
		return res.json({
			message: "Error getting products. Try later",
			status: false,
		});
	}
};

// POST at products/filteredproducts
// Function to get products based on category
const getFilteredProducts = async (req, res) => {
	try {
		const category = req.body.category;
		const regex = new RegExp(category, "i");
		const products = await Product.find({
			$or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
		});

		if (products.length > 0) {
			console.log(products);
			console.log("yes");
			return res.json(products);
		} else {
			return res.json([]);
		}
	} catch (error) {
		console.error(error);
		return res.json({
			message: "Error getting products. Try later",
			status: false,
		});
	}
};

// POST at products/showMyProducts
// Function to get all products posted by a user
const getMyProducts = async (req, res) => {
	try {
		const userId = req.body.userid;
		const products = await Product.find({ userid: userId });

		if (products.length > 0) {
			console.log(products);
			console.log("yes");
			return res.json(products);
		} else {
			return res.json([]);
		}
	} catch (error) {
		console.error(error);
		return res.json({
			message: "Error getting products. Try later",
			status: false,
		});
	}
};

// POST at products/addProduct
// Function to add a product to the database
const addProduct = async (req, res) => {
	try {
		const newProduct = new Product({
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			per: req.body.per,
			seller_mobile_number: parseInt(req.body.seller_mobile_number),
			product_image_url: req.body.product_image_url,
			city: req.body.city,
			userid: req.body.userid,
		});

		console.log("DEBUG: ", newProduct);

		const savedProduct = await newProduct.save();
		console.log(savedProduct);
		return res.json({
			message: "Product posted!",
			status: true,
			data: savedProduct,
		});
	} catch (error) {
		console.error(error);
		return res.json({
			message: "Error adding product. Try later",
			status: false,
		});
	}
};

// POST at products/product
// Function to get a product by id
const getProduct = async (req, res) => {
	try {
		const productId = req.body.id;
		const product = await Product.findOne({ _id: productId });

		if (product) {
			console.log(product);
			return res.json({ product });
		} else {
			return res.json({ message: "No product found", status: false});
		}
	} catch (error) {
		console.error(error);
		return res.json({
			message: "Error getting product. Try later",
			status: false,
		});
	}
};

router.get("/", getAllProducts);
router.post("/filteredproducts", getFilteredProducts);
router.post("/showMyProducts", getMyProducts);
router.post("/addProduct", addProduct);
router.post("/product", getProduct);

module.exports = router;
