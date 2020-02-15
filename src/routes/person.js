let express = require("express");
let router = express.Router();

// Added query string ==> ?
// localhost:3000/person?name=Sauhard
router.get("/person", (req, res) => {
  if (req.query.name) {
    res.send(`Requested for ${req.query.name}`);
  } else {
    res.send("Requested a person");
  }
});

// Params property
// localhost:3000/Sau
router.get("/person/:name", (req, res) => {
  res.send(`Welcome ${req.params.name}`);
});

router.get("/error", (req, res) => {
  throw new Error("This is a forced error.");
});

module.exports = router;
