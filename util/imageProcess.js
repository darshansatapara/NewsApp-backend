const fs = require("fs");
const sharp = require("sharp");

const imageProcess = async (req, id) => {
  fs.access("./data/uploads", (err) => {
    if (err) {
        fs.mkdirSync('./data/uploads');
    }
  });

  const formatedName = req.file.originalname.split(" ").join("-");
  const filename = `${id}-${formatedName}`;

  await sharp(req.file.buffer)
    .resize({
      width: 615,
      height: 350,
    })
    .toFile(`./data/uploads/${filename}`);

    return filename;
};
module.exports = imageProcess;
