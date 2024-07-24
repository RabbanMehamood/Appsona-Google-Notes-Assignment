const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  console.log('this is autjh',authHeader,'end')
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]
  console.log('this is token',token,'this is end')
  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    console.log(decoded)
    req.user = decoded.userId;
    console.log(`this is userid,${req.user}`)
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
