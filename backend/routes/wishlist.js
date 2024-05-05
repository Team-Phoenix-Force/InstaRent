const router = require("express").Router();
let Wishlist = require("../models/wishlist.model");

router.post("/addWish", async (req, res) => {
	try {
		const userId = req.body.userid;
		const productId = req.body.id;
		const page = req.body.page;
		// console.log(page);

		// Check if the product is already in the user's wishlist
		const existingWishlistItem = await Wishlist.findOne({
			userid: userId,
			id: productId,
		});

		if (existingWishlistItem) {
			if (page === "product") {
        return res.json({
          status: true,
        });
			}
			// If the product already exists in the wishlist, remove it
      console.log("removing")
      await Wishlist.findOneAndDelete({ userid: userId, id: productId });
			return res.json({
				message: "Product removed from wishlist",
				status: false,
			});
  
		} else {
			// If the product does not exist in the wishlist, add it
			const newWishlistItem = new Wishlist({ userid: userId, id: productId });
			const savedWishlistItem = await newWishlistItem.save();
			return res.json({
				message: "Product added to wishlist!",
				status: true,
				data: savedWishlistItem,
			});
		}
	} catch (error) {
		console.error(error);
		return res.json({
			message: "Error adding/removing product to/from wishlist",
			status: false,
		});
	}
});

router.post("/checkWish", async (req, res) => {
	try {
		const userId = req.body.userid;
		const productId = req.body.id;

		// Check if the product exists in the user's wishlist
		const wishlistItem = await Wishlist.findOne({
			userid: userId,
			id: productId,
		});

		if (wishlistItem) {
			return res.json({ status: true, data: wishlistItem });
		} else {
			return res.json({ status: false, data: null });
		}
	} catch (error) {
		console.error(error);
		return res.json({
			message: "Error checking product in wishlist",
			status: false,
		});
	}
});

module.exports = router;
