const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const wishlistSchema=new Schema({
    wish_id:{type:Number,required:true},
    id:{type:String,default: null},
    userid:{type:String,required:true},
    
},{
    timestamps:true
});
const Wishlist=mongoose.model('wishlist',wishlistSchema);
module.exports=Wishlist