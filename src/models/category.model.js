const mongoose = require("mongoose");
const Category = mongoose.model("Category", {
  categoryName: {
    type: String
  }
});
module.exports = Category;
