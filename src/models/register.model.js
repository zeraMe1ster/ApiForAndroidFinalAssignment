const mongoose = require("mongoose");
const Register = new mongoose.Schema({
  fullname: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: String
});

module.exports = mongoose.model("register", Register);
