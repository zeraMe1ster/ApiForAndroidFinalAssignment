const jwt = require("jsonwebtoken");
const Register = require("./models/register.model");
module.exports.verifyUser = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    let err = new Error("Bearer token is not set!");
    err.status = 401;
    return next(err);
  }

  let token = authHeader.split(" ")[1];
  let data;

  try {
    data = jwt.verify(token, 'AnythingCanBeMySecretKey');
  } catch (err) {
    throw new Error("Token could not be verified!");
  }

  Register.findById(data._id).then(Register => {
    req.Register = Register;
    next();
  });
};

module.exports.verifyAdmin = (req, res, next) => {
  if (!req.user) {
    let err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }
  if (req.user.admin !== true) {
    let err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
  next();
};
