const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
module.exports = async function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");
  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token! Authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
