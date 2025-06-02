const multer = require("multer");
const path = require("path");

const imageUpload = (dir, moduleName = "img") => {
  const fileName =
    moduleName + "_" + Date.now() + path.extname(file.originalname);
  const userProfileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/" + dir);
    },
    filename: (req, file, cb) => {
      cb(null, fileName);
    },
  });
  multer({ storage: userProfileStorage });
  return fileName;
};

module.exports = imageUpload;
