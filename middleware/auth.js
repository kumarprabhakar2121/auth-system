const jwt = require("jsonwebtoken");

//model is optional

const auth = (req, res, next) => {
  console.log("auth is running ");
  const token =
    req.body.token ||
    req.cookies.token ||
    req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    res.status(403).send("token missing");
  } else {
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      console.log("invalid token ");
      return res.status(401).send("Invalid Token");
    }
    return next();
  }
};

module.exports = auth;
