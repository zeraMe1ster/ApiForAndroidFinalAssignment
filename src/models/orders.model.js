const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  userid: String,
  productid: String,
  quantity: Number
});
module.exports = mongoose.model("order", orderSchema);
