const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("./../models/User");
const auth = require("./../middleware/auth");
const jwtSecret = config.get("jwtSecret");
const tokenEx = config.get("tokenExpiration");

//@route GET api/auth
//@desc get logged in user
//@access private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(errr.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/auth
//@desc auth user and get token
//@access public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists().isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ msg: "Inavlid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(404).json({ msg: "Inavlid credentials" });
      }
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
