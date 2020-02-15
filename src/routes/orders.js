const express = require("express");
const router = express.Router();
const Order = require("../models/orders.model");

router.post("/addorder", (req, res, next) => {
  Order.create({
    userid: req.body.userid,
    productid: req.body.productid,
    quantity: req.body.quantity
  })
    .then(order => {
      res.json({ status: "Product Added!" });
    })
    .catch(next);
});

router.get("/getorder", (req, res, next) => {
  Order.find()
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

router.delete("/order/:id", function(req, res, next) {
  Order.findByIdAndDelete(req.params.id).then(response => {
    console.log("Product detleted of" + req.params.id);
  });
});

module.exports = router;
