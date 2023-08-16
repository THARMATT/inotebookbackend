const mongoose=require ('mongoose')
const{Schema}=mongoose;
const UserSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
       
        
    }
})
const User
module.exports=mongoose.model('user',UserSchema)