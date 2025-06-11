const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fieldName = file.fieldname;
    const uploadPath = path.join(__dirname, "..", "uploads", fieldName);

    // Ensure folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

/**
 * Accepts multiple fields with names like:
 * [{ name: 'profile_pic' }, { name: 'logo' }, { name: 'favicon' }]
 */
module.exports = function (fields = []) {
  return upload.fields(fields);
};