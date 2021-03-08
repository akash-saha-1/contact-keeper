const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("./../models/User");
const Contact = require("./../models/Contact");
const auth = require("./../middleware/auth");

//@route GET api/contacts
//@desc get all contacts of logged in user
//@access private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    }); //-1 means latest date first
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/contacts
//@desc add new contacts
//@access private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).json({ errors: errs.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route PUT api/contacts/:id
//@desc update contact
//@access private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  //build contact Object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ msg: "Contact Not found" });
    }
    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@route Delete api/contacts/:id
//@desc delete contact
//@access private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ msg: "Contact Not found" });
    }
    // make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "contact removed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
