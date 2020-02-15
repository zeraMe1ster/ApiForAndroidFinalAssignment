const express = require("express");
const Cart = require("../models/buy.modal");
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

router.post("/buyProduct", (req, res, next) => {
  date = new Date();
  Cart.create({
    productid: req.body.productid,
    userid: req.body.userid,
    phone: req.body.phone,
    location: req.body.location,
    date: date
  })
    .then(cart => {
      console.log(req.body);
      res.json({ status: "Product Purchased.. " });
    })
    .catch(next);
});

// join query
router.post('/getproductbuyed', (req,res,next) => {
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
         dataa.date=data.date; 
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