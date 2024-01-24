const express = require("express");
const News = require("./news/news.js");
const newsRouter = require("./routers/news.js");
const app = express();

app.use(express.static("public"));
app.use("/api", newsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
