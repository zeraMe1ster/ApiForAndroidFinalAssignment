const auth = require("./auth");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
var app = express();
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const cors = require("cors");
const registerRoute = require("./routes/register");
const categoryRoute = require("./routes/category");
const uploadRouter = require("./routes/uploads");
const productRouter = require("./routes/products");
const NotificationRoute = require("./routes/notification");
const CartRoute = require("./routes/carts");
const BuyRoute = require("./routes/buys");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(morgan("tiny"));
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "../public"));
app.use("/uploads", express.static(__dirname + "/uploads/images"));
require("./db/connect");
app.use(express.json());
app.use("/register", registerRoute);
app.use("/category", categoryRoute);
app.use("/upload", uploadRouter);
app.use("/product", productRouter);
app.use("/notification", NotificationRoute);
app.use("/cart", CartRoute);
app.use("/buy", BuyRoute);
app.use(auth.verifyUser);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});
app.listen(process.env.PORT, () => {
  console.log(`App is running at localhost:${process.env.PORT}`);
});
