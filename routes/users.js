const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("./../models/User");
const jwtSecret = config.get("jwtSecret");
const tokenEx = config.get("tokenExpiration");

//@route POST api/users
//@desc Register a User
//@access public
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with minimum length 5").isLength(
      {
        min: 5,
        max: 20,
      }
    ),
  ],
  async (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "user already exists" });
      }
      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(15);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: tokenEx,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
