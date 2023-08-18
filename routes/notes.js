const express = require("express");
const { body, validationResult } = require("express-validator");

const mongoose = require("mongoose");
const { Schema } = mongoose;
const Notes = require("../models/Notes");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");

//Route1: get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error...");
  }
});

//Route2: add the notes by post request
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 6 }),
    body("description", "must be like a description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;

      // for errors return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        user: req.user.id,
      });
      const saveNotes = await note.save();
      res.json(saveNotes);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error...");
    }
  }
);


//Route3: update the notes by put request

router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
    const{title,description}=req.body;
    try {
        const newNotes={};
    if(title){newNotes.title=title};
    if(description){newdescription=description}

    //find the note to b updated
    // const note=Note.findByIdAndUpdate()
    let note= await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("not found")
    }
    if(note.user.toString()!==req.user.id){
        return res.res.status(401).send("not allowed")
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
    res.json({note})
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error...");
    }
    
})

//Route3: delete the notes by delete  request
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const{title,description}=req.body;
    // const newNotes={};
    // if(title){newNotes.title=title};
    // if(description){newdescription=description}

   
try {
    
    let note= await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("not found")
    }
     //allow deletion to aunthicate user
    if(note.user.toString()!==req.user.id){
        return res.res.status(401).send("not allowed")
    }
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"Successfully ":"note deleted",note})
} catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error...");
    
}
})






module.exports = router;
