const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const messagesSchema=new Schema({
    sender_id:{type:String,required:true},
    receiver_id:{type:String,required:true},
    time:{type:Date,required:true},
    date:{type:Date,required:true},
    content:{type:String,default: null},
},{
    timestamps:true
});
const Messages=mongoose.model('messages',messagesSchema);
module.exports=Messages