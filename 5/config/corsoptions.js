const allowedOrigins = require("./allowedorigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //Allow postman or another app to have access to our api
      callback(null, true); //No error and true to the granted access
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, //To not to have any problems with different devices like smart tv or so
};

module.exports = corsOptions;
