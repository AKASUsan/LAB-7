const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const router = require("./routes/myrouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.listen(port, () => {
  console.log(`Starting server at prot:${port}`);
});
