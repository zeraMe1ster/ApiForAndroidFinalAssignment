const mongoose = require("mongoose");
const Notification = mongoose.Schema({
  postedDate: Date,
  endDate: Date,
  title: String,
  description: String
});
module.exports = mongoose.model("notification", Notification);
