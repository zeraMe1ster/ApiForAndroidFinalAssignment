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
});
module.exports = mongoose.model("cart", Cart);
