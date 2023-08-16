const mongoose = require('mongoose');
const mongoURI="mongodb+srv://inotebook:notebook@cluster0.8aoplpb.mongodb.net/?retryWrites=true&w=majority"
// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//        console.log("connected")
       
//     })
// }
const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("yessss Connected to MongoDB");
  };
module.exports=connectToMongo;