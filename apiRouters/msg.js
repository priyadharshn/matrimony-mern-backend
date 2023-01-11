const { addMessage, getMessages } = require("../apiRouters/message");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);

module.exports = router;