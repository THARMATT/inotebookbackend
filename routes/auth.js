const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "NIGAMISLEARNINGUNDERPRESSURE";
const fetchuser = require("../middleware/fetchUser");
//Route 1: create a user using :POST"/API/AUTH"
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
      // console.log(jwtdata);

      res.json({ authToken, Progress: "Uploaded successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error...");
    }
  }
);

// Route2:authenticate a user using :POST"/API//login"
router.post(
  "/login",
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

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "either password or username is invalid" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status.json({ error: "bhosdike sahi daal" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtdata);

      res.json({ authToken, Progress: "Uploaded successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error...");
    }
  }
);
// Route 3 : user details using POST "API/AUTH/GETUSER"
router.post(
  "/getuser",
  fetchuser,

  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error...");
    }
  }
);
module.exports = router;
