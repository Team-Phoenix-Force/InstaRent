const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const Product = require('./models/product.model'); 
let Wishlist=require('./models/wishlist.model');


require('dotenv').config();
const app=express();
const port=process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri=process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});






const messageRouter=require('./routes/messages');
const usersRouter=require('./routes/users');
const wishlistRouter=require('./routes/wishlist');
const productRouter=require('./routes/product');


app.post("/showWishlist", async (req, res) => {
    try {
        const userId = req.body.userid;
        const wishlistItems = await Wishlist.find({ userid: userId });

        if (wishlistItems.length > 0) {
            const productIds = wishlistItems.map(item => item.id);
            const products = await Product.find({ _id: { $in: productIds } });
            return res.json(products);
        } else {
            return res.json([]);
        }
    } catch (error) {
        console.error(error);
        return res.json({ message: "Error getting wishlist items. Try later", status: false });
    }
});





app.use('/messages',messageRouter);
app.use('/users',usersRouter);
app.use('/wishlist',wishlistRouter);
app.use('/product',productRouter);

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
})