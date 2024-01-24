const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const News = require("../news/news");
const imageProcess = require("../util/imageProcess");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", upload.single("thumbnail"), async (req, res) => {
  const news = new News();
  const id = news.createId();
  await imageProcess(req, id);

    await news.create(req.body, id, req.file.filename);

//   try {
//     const news = new News();
//     const id = news.createId();
//     await imageProcess(req, id);

//     // Access form data using req.body
//     const { title, content, category } = req.body;

//     // Access the file using req.file
//     const imageName = req.file.filename;

//     await news.create({ title, content, category }, id, imageName);

//     res.send({ message: "News created successfully" });
//   } catch (error) {
//     console.error("Error creating news:", error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
});

module.exports = router;
