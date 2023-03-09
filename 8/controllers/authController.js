const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

/* Access Token Process involves:
* Issuing an access token after user authentication
* Users's app can then access our rest api's protected routes with the access token until it expires
* Our rest api will verify the token every time the token is used to make a request
* When the access token does expiry, the user's app need to send the refresh token to our rest api's refresh endpoint to be granted a new access token
   Refresh Token Process involves:
* Issued after user auhentication
* Our rest api endpoint will also verify the token.
* If the refresh token is valid, a new access token will be provided to the user's app.
* The refresh token must be allowed to expiry at some point to prevent indefinite access. */

//1) First method Login
// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body; // a) We are expecting a username and a password to come

  if (!username || !password) {
    //b) iF we do not receive  a username not a password, send a bad 400 status message
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ username }).exec(); //c) Then, we look for the user in our mongodb database in the users collection.

  if (!foundUser || !foundUser.active) {
    //d) If we don not find the user or if the user is not active, we can keep the user in database and just deactivate it with out deleting, we send a status response Unauthorized.
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password); //e) If the user exists, we try to match the password with brypt, comparing the password we receive to the password stored in database.

  if (!match) return res.status(401).json({ message: "Unauthorized" }); //f) If the password does not match, send 401 unauthorized again.

  /* Create our access token, refresh token and the secure httpOnly cookie */
  const accessToken = jwt.sign(
    //g) Use the jwt imported from dependencies, contains the User info object to be inserted inside the access token. Remember we need to destructure this access token when returning the information in the front end app
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // First in development, we set to 10 s, after deploy, put 15 min aprox
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // First in development, we set to 1 day, after deploy, put 7 days aprox as client requirement
  );

  // h) Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by a web server
    secure: true, //https
    sameSite: "None", //cross-site cookie is a possibility we will be hosting our rest api possibly at one server and our app at another server
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match refresh token 7 days
  });

  // i) Send accessToken containing username and roles. The client app receives the access token, the server sets the cookie. The client app with react never actually handles the refrsh token inside of the res.cookie but we will ensure that when react sends the request to the /refresh endpoint, the cookie is sent along with it.
  res.json({ accessToken });
});

//2) Second method Refresh
// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies; //a) We are expecting a cookie with the request

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" }); //b) If we do not have a cookie named jwt as expected, we will send a status response 402 unauthorized

  const refreshToken = cookies.jwt; //c) If we have cookies.jwt, we save it into refreshToken variable

  jwt.verify(
    //d) Use jwt deopendency to verify this token, pass the refresh token variavle and the REFRESH_TOKEN_SECRET in .env
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      //e)If we get an error, we respond with a 403 forbidden
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        //f) If we have a user from the decoded username inside the refresh token, then we gonna create a new access token, if not, res.status unauthorized
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        //g) Create a new access token and send it.
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" } // Change after deployment to 15m
      );

      res.json({ accessToken });
    })
  );
};
//3) Third method Logout
// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies; //a) We expect the res.cookies inside the refresh token
  if (!cookies?.jwt) return res.sendStatus(204); //b) If not cookie insede => Request succesful but No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); //c) If there is a cookie otherwise, we will remove that cookie when the user decides to manually log out and pass all the same options when cretaed the cookie
  res.json({ message: "Cookie cleared" }); //d) Response with a message when the cookie is cleared
};

//EXPORT THE MODULES TO FINISH THIS CONTROLLER
module.exports = {
  login,
  refresh,
  logout,
};
