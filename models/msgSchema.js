const mongoose = require("mongoose");
const schema = mongoose.Schema;
const messageData =  schema({
  senderId:{
    type: String,
  },
  receiverId:{
    type:String,
  },
  Message:{
    type: String,
  },
})
module.exports = mongoose.model('messages', messageData);
