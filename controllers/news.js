const News = require("../news/news");
const imageProcess = require("../util/imageProcess");

const news = new News();

const createNews = async (req, res) => {
  const id = news.createId();

  try {
    const imageName = await imageProcess(req, id);
    news.create(req.body, id, imageName); // http://locahost:3000/image-name
    res.json({ success: true, message: "Post created successfully." });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong, server error!",
    });
    console.log("Error while creating news", error.message);
  }
};

const getAllNews = async (req, res) => {
  try {
    const data = await news.getAll();
    res.json({ success: true, news: data });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong, server error!",
    });
    console.log("Error while getting all news", error.message);
  }
};

const getSingleNews = async (req, res) => {
  try {
    // console.log('Requested News ID:', id); // Log the requested ID

    const data = await news.getSingle(req.params.id);
    // console.log("Retrieved News Data:", data); // Log the retrieved data

    if (!data) {
      return res.json({
        success: false,
        message: "Post not found!",
      });
    }

    res.json({
      success: true,
      news: data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong, server error!",
    });
    console.log("Error while getting single news", error.message);
  }
};

const getNewsByCategory = async (req, res) => {
  try {
    const { category, qty } = req.params;
    const data = await news.getByCategory(category);
    if (!data) {
      return res.json({ success: false, message: "Posts not found!" });
    }

    if (qty) {
      return res.json({ success: true, news: [...data].splice(0, qty) });
    }

    res.json({ success: true, news: data });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong, server error!",
    });
    console.log("Error while getting news by category!", error.message);
  }
};

const searchPosts = async (req, res) => {
  try {
    const { query } = req.params;

    if (query.trim()) {
      const response = await news.searchPosts(query);

      if (response.length === 0) {
        return res.json({ success: false, message: "No match found." });
      }

      return res.json({ success: true, news: response });
    }

    return res.json({ success: false, message: "No match found." });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong, server error!",
      error: error.message, // Provide more specific error information if needed
    });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getSingleNews,
  getNewsByCategory,
  searchPosts,
};
