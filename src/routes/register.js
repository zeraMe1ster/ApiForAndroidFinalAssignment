const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = require("../models/register.model");
const router = express.Router();
const auth = require("../auth");

router.post("/register_user", (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      throw new Error("Could not hash!");
    }
    Register.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hash
    })
      .then(register => {
        let token = jwt.sign({ _id: register._id }, 'AnythingCanBeMySecretKey');
        res.json({ status: "Signup success!", token: token });
      })
      .catch(next);
  });
});
//forgot password
router.post("/forgotpassword", (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      throw new Error("Could not hash!");
    }
    Register.findOne({
      email: req.body.email,
      number: req.body.number
    })
      .then(register => {
        password: hash;
      })
      .catch(next);
  });
});
router.post("/login_user", (req, res, next) => {
  Register.findOne({ email: req.body.email })
    .then(register => {
      if (register == null) {
        let err = new Error("User not found!");
        err.status = 401;
        return next(err);
      } else {
        bcrypt
          .compare(req.body.password, register.password)
          .then(isMatch => {
            if (!isMatch) {
              let err = new Error("Password does not match!");
              err.status = 401;
              return next(err);
            }

            let token = jwt.sign({ _id: register._id }, process.env.SECRET);
            console.log(token);
            res.json({ status: "Login success!", token: token, _id: register._id });
            // res.json({ _id: register._id })
          })
          .catch(next);
      }
    })
    .catch(next);
});
router.get("/me", auth.verifyUser, (req, res, next) => {
  let password = req.Register.password;
  bcrypt.hash(password, 10);
  res.json({
    _id: req.Register._id,
    fname: req.Register.fname,
    lname: req.Register.lname,
    email: req.Register.email,
    address: req.Register.address,
    number: req.Register.number,
    password: req.Register.password
  });
});
router.put("/me", auth.verifyUser, (req, res, next) => {
  Register.findByIdAndUpdate(
    req.Register._id,
    { $set: req.body },
    { new: true }
  )
    .then(register => {
      res.json({
        _id: register._id,
        fname: req.register.fname,
        lname: req.register.lname,
        email: reg.email,
        address: req.register.address,
        number: req.register.number
      });
    })
    .catch(next);
});

router.get("/getusers", (req, res, next) => {
  Register.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.delete("/deleteuser/:id", function(req, res, next) {
  Register.findByIdAndDelete(req.params.id).then(response => {
    console.log("User detleted of" + req.params.id);
  });
});

module.exports = router;
