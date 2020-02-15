const express = require("express");
const Notification = require("../models/notification.model");
const router = new express.Router();

router.get("/notifications", function(req, res) {
  Notification.find()
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

router.post("/upload_notification", (req, res, next) => {
  Notification.create({
    postedDate: req.body.postedDate,
    endDate: req.body.endDate,
    description: req.body.description,
    title: req.body.title
  })
    .then(product => {
      res.json({ status: "Notification Added!" });
    })
    .catch(next);
});

router.delete("/deletenotification/:id", function(req, res) {
  Notification.findByIdAndDelete(req.params.id, req.body, function(
    err,
    register
  ) {
    if (err) return next(err);
    res.json(register);
  });
});

router.get("/:id", function(req, res) {
  Notification.findById(req.params.id)
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

module.exports = router;
