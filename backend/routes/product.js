const router = require('express').Router();
const Product = require('../models/product.model'); 

router.post("/products", async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        console.error(error);
        return res.json({ message: "Error getting products. Try later", status: false });
    }
});


router.post("/addProduct", async (req, res) => {
    try {
        const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            price: parseFloat(req.body.price),
            seller_mobile_number: req.body.seller_mobile_number,
            product_image_url: req.body.product_image_url,
            address: req.body.address,
            userid: req.body.userid
        });

        const savedProduct = await newProduct.save();
        console.log(savedProduct);
        return res.json({ message: "Product posted!", status: true, data: savedProduct });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Error creating ad. Try later", status: false });
    }
});


router.post("/products/product", async (req, res) => {
    try {
        const productId = req.body.id;
        const product = await Product.findOne({ _id: productId });

        if (product) {
            console.log(product);
            return res.json({ data: product });
        } else {
            return res.json({ data: [] });
        }
    } catch (error) {
        console.error(error);
        return res.json({ message: "Error getting product. Try later", status: false });
    }
});


router.post("/filteredproducts", async (req, res) => {
    try {
        const category = req.body.category;
        const regex = new RegExp(category, 'i');
        const products = await Product.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } }
            ]
        });

        if (products.length > 0) {
            console.log(products);
            console.log('yes');
            return res.json(products);
        } else {
            return res.json([]);
        }
    } catch (error) {
        console.error(error);
        return res.json({ message: "Error getting products. Try later", status: false });
    }
});
router.post("/showMyProducts", async (req, res) => {
    try {
        const userId = req.body.userid;
        const products = await Product.find({ userid: userId });

        if (products.length > 0) {
            console.log(products);
            console.log('yes');
            return res.json(products);
        } else {
            return res.json([]);
        }
    } catch (error) {
        console.error(error);
        return res.json({ message: "Error getting products. Try later", status: false });
    }
});



module.exports = router;
