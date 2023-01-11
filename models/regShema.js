const mongoose = require("mongoose")
const schema=mongoose.Schema;
const regSchema = new schema({
   First_Name: {
      type: String,
      require: true,
      trim: true,
   },
   Last_Name: {
      type: String,
      require: true,
      trim: true,
   },
   Email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
   },
   Password: {
      type: Number,
      require: true,
   },
   Confirm_Password: {
      type: Number,
      require: true,
   },
   Phone_Number: {
      type: Number,
   },
   Birth_Date: {
      type: Date,
      required: true,
      trim: true,
   },
   Religion: {
      type: String,
      enum: ['Hindu', 'Mustlim', 'Christian'],
      required: true,
   },
   Gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
   },
   Age: {
      type: Number,
   },
   Height: {
      type: Number,
   },
   Weight: {
      type: Number,
   },
   Profession: {
      type: String,
      enum: ['Software Engineer', 'Fashion Industry', 'Web Developer', 'Lecturer', 'Financial Manager', 'Medical and Health Services Manager', 'Scientist', 'Entertainment Industry', 'Designer', 'Hotel Management'],
      required: true,
   },
   Upload_Photo: {
      type: String,
   },
//    message:{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//   }
})
module.exports = mongoose.model('Users', regSchema);



