const mongoose=require("mongoose");
const schema=mongoose.Schema;
const receiveMsg = new schema({
   
    receiverId :{
        type: String,
    },
    senderId:{
        type: String,
    },
    Message: [
        {
        senderId:{
            type: String,
        },
        Message:{
            type: String,
        }
    }
    ]
})
const receiveDatas=mongoose.model('messages', receiveMsg);
module.exports = receiveDatas;