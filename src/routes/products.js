const express = require("express");
const router = express.Router();
const Product = require("../models/products.model");

router.post("/addproducts", (req, res, next) => {
  Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category
  })
    .then(product => {
      res.json({ status: "Product Added!" });
    })
    .catch(next);
});

router.get("/getproduct", (req, res, next) => {
  Product.find()
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

router.delete("/deleteproduct/:id", function(req, res, next) {
  Product.findByIdAndDelete(req.params.id).then(response => {
    console.log("Product detleted of" + req.params.id);
  });
});

router.get("/:id", function(req, res) {
  Product.findById(req.params.id)
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

router.put("/updateproduct/:id", (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price
    },
    { new: true }
  );
});


module.exports = router;
