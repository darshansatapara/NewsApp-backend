const express = require("express");
const router = express.Router();
const uploads=require('../middleware/multer');
const {createNews}=require('../controllers/news')
const {result,validator,validateFile}=require('../middleware/validator')

router.post("/create", uploads.single("thumbnail"), validator, validateFile, result, createNews);


module.exports = router;
