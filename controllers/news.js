const News = require("../news/news");
const imageProcess = require("../util/imageProcess");
const createNews = async (req, res) => {
  const news = new News();
  const id = news.createId();
  try {
    const imageName = await imageProcess(req, id);
    await news.create(req.body, id, imageName);
    res.send("created successfully!");
  } catch (error) {
    res.send("error hai bhai", error.message);
  }
};

module.exports = {
  createNews,
};
