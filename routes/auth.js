const express = require("express");
const {
  body,
  validationResult,
  ValidationChain,
} = require("express-validator");
const User = require("../models/User");
const router = express.Router();
//create a user using :POST"/API/AUTH"
router.post(
  "/createuser",
  [
    body("password", "sahi sahi daliye naa").isLength({ min: 6 }),
    body("email", "must be like an email").isEmail(),
  ],
  async (req, res) => {

    // for errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "sorry user exits" });
    }
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })

      // .then((user) => res.json(user))
      // .catch(
      //   (err) => console.log(err),
      //   res.json({ error: "error is occuring...", message: err.message }) )
      res.json({user,"Progress":"Uploaded successfully"})}
      catch(error){
console.log(error)
res.status(500).send("maa chud gyi")
      }
  }
)

module.exports = router;
