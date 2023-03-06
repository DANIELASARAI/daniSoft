const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    //We look at the header of the request and make sure is an authorization header with both capital Authorization or authorization lower case.  There is no standar requirement. Better look for both. Good practice. 'Bearer '  after that should be the token this is standard
    return res.status(401).json({ message: "Unauthorized" }); //If not we send 401 unauthorized
  }

  const token = authHeader.split(" ")[1]; // We just want the second value after the space and pass it into the jwt.verify

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" }); //If error, send forbidden response
    req.user = decoded.UserInfo.username; // Otherwise we should have decoded values and call next
    req.roles = decoded.UserInfo.roles;
    next(); // Next middleware inline or move on to the controller if that's where the request needs to go
  });
};

module.exports = verifyJWT;
