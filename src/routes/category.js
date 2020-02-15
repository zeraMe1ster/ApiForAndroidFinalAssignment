const express = require("express");
const category = require("../models/category.model");
const router = new express.Router();

router.get("/category", function(req, res) {
  category
    .find()
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

router.post("/upload_category", function(req, res) {
  console.log(req.body);
  var data = new category(req.body);
  data.save();
});

router.delete("/categorydelete/:id", function(req, res) {
  category.findByIdAndDelete(req.params.id, req.body, function(err, register) {
    if (err) return next(err);
    res.json(register);
  });
});

router.get("/category/:id", function(req, res) {
  category
    .findById(req.params.id)
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

router.post('/getProduct', (req,res,next) => {
  const id = req.body._id;
  category.find({_id:id})
  .exec()
  .then(doc => {
      if(doc) {
       res.status(200).json(doc);
      }else{
          res.status(404).json({
              message: 'No sub category found'
          });
      }
  }).catch(err => {
      res.status(500).json({error:err});
  });
});

module.exports = router;
