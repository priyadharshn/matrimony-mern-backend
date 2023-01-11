const express = require("express");
const { db } = require("../models/regShema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SecretKey = "SecretKey";
const regSchema = require("../models/regShema");
const messageShema=require("../models/msgSchema")
const multer = require('multer')
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, Date.now() + '-' + fileName)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
var type = upload.single('Upload_Photo')

router.post('/registration',type, async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(req.body, req.file);
  const data = new regSchema({
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Email: req.body.Email,
    Password: req.body.Password,
    Confirm_Password: req.body.Confirm_Password,
    Birth_Date: req.body.Birth_Date,
    Phone_Number: req.body.Phone_Number,
    Gender: req.body.Gender,
    Age: req.body.Age,
    Height: req.body.Height,
    Weight: req.body.Weight,
    Profession: req.body.Profession,
    Religion: req.body.Religion,
    Message: req.body.Message,
    // node:internal/errors:478,
    Upload_Photo: url + '/public/' + req.file.filename,
    }) 
  const { First_Name, Last_Name, Email, Password, Confirm_Password, Birth_Date, Phone_Number, Age, Height, Weight, Gender } = req.body;
  if (!First_Name || !Last_Name || !Phone_Number || !Birth_Date || !Age || !Height || !Weight || !Gender) {
    return res.status(400).json({
      message: "Please Provide Required Information",
    });
  }
  else if (!Email || !Password) {
    return res.status(400).json({
      message: "Email or password missing."
    })
  }
  else if (Password === Confirm_Password) {
  }
  else {
    res.status(400).json({
      message: "Password not matching",
    });
  }

//   router.post('/message/:id',async (req,res)=>{
  
// if(err){
//   res.status(200).json({
//     success:true,
//     message: "message"
//   })
// }
// })
  

  const checkUserEmail = await regSchema.findOne({ Email: data.Email });
  if (checkUserEmail) {
    res.status(400).json({
      success: false,
      message: "User already Exist with this email id",
    })
  }
  else {
    await data.save()
    res.status(200).json({
      success: true,
      status: 200,
      message: "User Register Successfully",
      data
    });
  }
})

router.post('/login', async (req, res) => {
  console.log(req.body);
  // const Email = req.body.Email;
  // const Password = req.body.Password;
  const { Email, Password } = req.body;
  jwt.sign({ Email, Password }, SecretKey, { expiresIn: '500s' }, (err, token) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        token
      })
    }
  })
})

router.post("/token", verifyToken, (req, res) => {
  jwt.verify(req.token, SecretKey, (err, authData) => {
    if (err) {
      res.send({
        result: "Invalid token"
      })
    } else {
      res.json({
        message: "token accessed",
        authData
      })
    }
  })
})

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split('');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: 'Token is not valid'
    })
  }
}

//getAll male users
router.get('/getmaleusers', async (req, res) => {
  console.log(req.body)
  const findMaleData = await regSchema.find({ Gender: 'Male' });
  res.status(200).json(findMaleData);
})

//getAll female users
router.get('/getfemaleusers', async (req, res) => {
  console.log(req.body)
  try {
    const findFemaleData = await regSchema.find({ Gender: 'Female' })
    res.status(200).json(findFemaleData);
  } catch (err) {
    return res.status(500);
  }
})
router.get('/getusers/:id', async (req, res) => {
  console.log(req.body)
  const findData = await regSchema.findOne({ _id: req.params.id })
  res.status(200).json(findData);
})
var type = upload.single('Upload_Photo')

router.put("/update/:id",type, (req, res) => {
  const url = req.protocol + '://' + req.get('host')

console.log(req.body,req.file)
  regSchema.updateOne({ _id: req.params.id }, {
    
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      Email: req.body.Email,
      Password: req.body.Password,
      Confirm_Password: req.body.Confirm_Password,
      Birth_Date: req.body.Birth_Date,
      Phone_Number: req.body.Phone_Number,
      Gender: req.body.Gender,
      Age: req.body.Age,
      Height: req.body.Height,
      Weight: req.body.Weight,
      Profession: req.body.Profession,
      Religion: req.body.Religion,
    Upload_Photo: url + '/public/' + req.file.filename
     
    }
  , function (err, data) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send({ message: 'UPDATED', data: data })
    }
  })  
})

router.get('/getmaleusers/:id', async (req, res) => {
  console.log(req.body)
  try {
    const findMale = await regSchema.find({_id:req.params.id})
    res.status(200).json(findMale);
  } catch (err) {
    return res.status(500);
  }
})
router.get('/getfemaleusers/:id', async (req, res) => {
  console.log(req.body)
  try {
    const findFemale = await regSchema.find({_id:req.params.id})
    res.status(200).json(findFemale);
  } catch (err) {
    return res.status(500);
  }
})


// router.post("/message/:id",type, (req, res) => {
// console.log(req.body)
//   regSchema.({ _id: req.params.id }, {
//       Email: req.body.Email,
//      Message: req.body.Message,
//     }
//   , function (err, data) {
//     if (err) {
//       res.status(500).send(err)
//     } else {
//       res.status(200).send({ message: 'Msg Sent', data: data })
//     }
//   })  
// })
router.delete('/delfemaleusers/:id', async (req, res) => {
  console.log(req.body)
  try {
    const deleteFemale = await regSchema.deleteOne({_id:req.params.id})
    res.status(200).json(deleteFemale);
  } catch (err) {
    return res.status(500);
  }
})
router.delete('/delmaleusers/:id', async (req, res) => {
  console.log(req.body)
  try {
    const deleteMale = await regSchema.deleteOne({_id:req.params.id})
    res.status(200).json(deleteMale);
  } catch (err) {
    return res.status(500);
  }
})

router.get('/populate/:id',async(req,res)=>{
messageShema.findOne({ _id: req.params._id}).
  populate('users').
  exec(function (err) {
    if (err) return handleError(err);
  });messageShema.
  findOne({ _id: req.params._id }).
  populate('users').
  exec(function (err) {
    if (err) return handleError(err);
  });
})

module.exports = router;

