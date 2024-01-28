const express = require("express");
const News = require("./news/news.js");
const newsRouter = require("./routers/news.js");
const path = require("path");
const app = express();

app.use(express.static("public"));
app.use("/api", newsRouter);

app.use("/uploads", express.static(path.join(__dirname, "data/uploads")));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
