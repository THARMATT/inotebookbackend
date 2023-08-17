const mongoose=require ('mongoose')
const NotesSchema=new Schema({
    name:{
        type:String,
       
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