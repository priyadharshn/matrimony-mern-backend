
const mongoose=require("mongoose");                         

const database= async()=>{
mongoose.connect("mongodb://localhost:27017/matrimony_db",{   

useNewUrlParser:true,
useUnifiedTopology:true,

}).then(() =>  
console.log('connecting to database successfully..!') )
.catch(err =>
    console.error('could not connect to mongoDB', err) )
}
mongoose.set("strictQuery",false);     
module.exports=database;