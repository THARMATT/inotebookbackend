const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    // obj={
    //     a:"v",
    //     k:"o"
    // }
    res.send(obj)
})
module.exports=router