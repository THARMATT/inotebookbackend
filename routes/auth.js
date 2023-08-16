const express=require('express')
const { body,validationResult, ValidationChain } = require('express-validator');
const User=require("../models/User")
const router=express.Router()
//create a user using :POST"/API/AUTH"
router.post('/',[
    body('password','sahi sahi daliye naa').isLength({ min: 6 }),
    body('email','must be like an email').isEmail(),
],  (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return     res.status(400).json({ errors: errors.array() });
    }
    User.create({
        username: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then (user=>res.json(user))
    // ser.create{
    //     username: req.body.name,
    //     password: req.body.password,
    //     email: req.body.email,
    // }.then (user=>res.json(user))
    // res.send(req.body)


 
  
})
module.exports=router