const express = require("express");
const mongoose = require("mongoose");
const router = require("./apiRouters/router");
const apps=require("./apiRouters/chat");
// const msg=require('./apiRouters/Msgsend');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const database = require("./database");
database();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use("/api", (req, res) => {
    res.json("Node js")
})
app.use("/", router);
app.use("/msg",apps);
// app.use("/sendmsg/:Email",msg);
const port = 5000;
app.listen(port, () => {
    console.log(`Server Started at ${port}`);

})
