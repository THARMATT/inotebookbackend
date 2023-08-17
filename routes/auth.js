const express = require("express");
const {
  body,
  validationResult,
  ValidationChain,
} = require("express-validator");
const User = require("../models/User");
const router = express.Router();
var bcrypt = require("bcryptjs");
const JWT_SECRET = "NIGAMISLEARNINGUNDERPRESSURE";
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

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "sorry user exits" });
      }
      const salt = await bcrypt.genSalt(10);
      securePassword = await bcrypt.hash(req.body.password, salt);

      //create new user
      user = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
      });

      // JWT/
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(jwtData);

      res.json({ authToken, Progress: "Uploaded successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("maa chud gyi");
    }
  }
);

module.exports = router;
