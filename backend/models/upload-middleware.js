const multer = require('multer');
const fs = require('fs');
const uploadDir = 'uploads/';

// Create the uploads directory if it does not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for file uploads
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Define the filename of the uploaded file
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace(/:/g, '-'); 
    cb(null, formattedDateTime + '-' + file.originalname);
  }
});

// Create the multer instance with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;