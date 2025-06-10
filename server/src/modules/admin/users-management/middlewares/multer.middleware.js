const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../../../../uploads"); // Adjust path to root-level uploads/
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Multer configuration
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error(`Only image files (jpeg, jpg, png, gif) are allowed for ${file.fieldname}`));
    },
});

// Middleware for handling file uploads
const uploadMiddleware = upload.fields([
    { name: "profile_pic", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
]);

module.exports = uploadMiddleware;