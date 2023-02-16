const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.use(
  "/",
  express.static(path.join(__dirname, "/public"))
); /* Say to express to look into the folder public for static files like CSS, images */

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
