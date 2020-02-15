const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  description: String,
  category: String
});
module.exports = mongoose.model("product", productSchema);
