const express = require("express");
const Cart = require("../models/carts.model");
const router = new express.Router();

router.get("/", function(req, res) {
  Cart.find()
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

router.post("/addcart", (req, res, next) => {
  Cart.create({
    productid: req.body.productid,
    userid: req.body.userid
  })
    .then(cart => {
      console.log(req.body);
      res.json({ status: "Cart Added!" });
    })
    .catch(next);
});

router.delete("/deletecart/:id", function(req, res) {
  Cart.findByIdAndDelete(req.params.id, req.body, function(err, register) {
    if (err) return next(err);
    res.json("Deleted");
    console.log("Deleted");
  });
});

router.get("/:id", function(req, res) {
  Cart.findById(req.params.id)
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

router.post("/checkcart", function(req, res) {
  const pp = Cart.find({
    productid: req.body.productid,
    userid: req.body.userid
  })
    .countDocuments()
    .then(function(count) {
      if (count == 0) {
        res.json({ status: "addhere" });
      } else {
        res.json({ status: "cantadd" });
      }
    });
});

router.post("/checkcart1", (req, res, next) => {
  Cart.find({
    productid: req.body.productid,
    userid: req.body.userid
  })
    .then(cart => {
      console.log(req.body);
      res.json({ status: "Cart Found!" });
    })
    .catch(next);
});

// get specific product uesma ?
router.post('/getCart', (req,res,next) => {
  const id = req.body.userid;
  Cart.find({userid:id})
  .exec()
  .then(doc => {
      if(doc) {
       res.status(200).json(doc);
      }else{
          res.status(404).json({
              message: 'No cart found'
          });
      }
  }).catch(err => {
      res.status(500).json({error:err});
  });
});

// join query
router.post('/getCartJoin', (req,res,next) => {
  const id = req.body.userid;
  Cart.find({userid:id})
  .populate("userid")
  .populate("productid")
  .exec()
  .then(doc => {
      if(doc) {
       
        result=[];
       doc.forEach(data => {
         var dataa={};
         dataa.username=data.userid.fullname;
         dataa.userid=data.userid._id;
         dataa.productid=data.productid._id;
         dataa.productName=data.productid.name;
         dataa.price=data.productid.price;
         result.push(dataa);
       });
       res.status(200).json(result);
      }else{
          res.status(404).json({
              message: 'No cart found'
          });
      }
  }).catch(err => {
      res.status(500).json({error:err});
  });
});
 
module.exports = router;