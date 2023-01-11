const express = require("express");
const apps = express.Router();
const messageShema = require("../models/msgSchema")
apps.post('/msg', async (req, res) => {
  console.log(req.body);
  const messages = new messageShema({
    senderId:req.body.senderId,
    receiverId:req.body.receiverId,
    Message: req.body.Message,
  })
  await messages.save()
  res.status(200).json({
    success: true,
    status: 200,
    message: "send Successfully",
    messages
  });
})
apps.get('/getmsg/:id', async (req, res) => {
  console.log(req.body)
  const findData = await messageShema.findOne({ _id: req.params.id })
  res.status(200).json(findData);
})

module.exports = apps;
