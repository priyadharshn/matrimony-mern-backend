const messages = require('../models/msgSchema');

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

// apps.post("/message", async(req,res)=>{
//     console.log(req.body)
//     const msg= new messageDatas({
//         Email:req.body.Email,
//         Message:req.body.Message,
//     });
//     await msg.save()
//     res.send("success")
//     });
//     apps.get("/getmessage", async(req,res)=>{
//       console.log(req.body)
//       const msgs=await  messageDatas.find()
//       .populate("Email")
//       .exec();
//       res.json(msgs)
     
//       });


// module.exports = apps;