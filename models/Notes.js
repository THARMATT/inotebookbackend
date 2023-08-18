const mongoose=require ('mongoose')
const{Schema}=mongoose;
const NotesSchema=new Schema({
    user:{
        // type:mongoose.Schema.Type.ObjectId,
        // ref:"user",
      
    },
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true
    },
    
})
module.exports=mongoose.model('notes',NotesSchema)