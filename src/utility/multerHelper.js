const multer = require("multer");
const fs = require("fs");

const MulterFileUpload = () => {
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  });

  return multer({ storage: storage });
};

module.exports = MulterFileUpload;
