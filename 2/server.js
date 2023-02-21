const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsoptions");

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
  "/",
  express.static(path.join(__dirname, "public"))
); /* Say to express to look into the folder public for static files like CSS, images. Try to get rid of / before public when isung path.join */

app.use(
  "/",
  require("./routes/root")
); /* The, go and create this route folder with root.js */

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt".send("404 not found"));
  }
}); /* This is to display any routes not found in our app and finish the first commit */
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
