const mongoose = require("mongoose");
const Cart = mongoose.Schema({
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"register"
  },
  productid: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"product"
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date
  }
});
module.exports = mongoose.model("buy", Cart);
