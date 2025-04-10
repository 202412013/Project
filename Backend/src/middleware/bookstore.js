const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// console.log("Initializing Cloudinary storage with config:", {
//   cloud_name: cloudinary.config().cloud_name,
//   api_key: cloudinary.config().api_key ? "***" : "missing",
//   api_secret: cloudinary.config().api_secret ? "***" : "missing"
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {

    const coverImage = req.files['coverImage']?.[0];
      if (coverImage) {
        console.log("File name:", coverImage.originalname);
        console.log("Size (bytes):", coverImage.size);
        console.log("MIME type:", coverImage.mimetype);
      }


    console.log(`Processing file: ${file.originalname}, type: ${file.mimetype}`);
    
    const isPDF = file.mimetype === 'application/pdf';
    const isImage = file.mimetype.startsWith('image/');

    const params = {
      folder: isPDF ? 'books' : 'book_covers',
      resource_type: isPDF ? 'raw' : 'image',
      allowed_formats: isPDF ? ['pdf'] : ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      public_id: `${file.originalname.split('.')[0]}-${Date.now()}`,
    };

    console.log("Cloudinary upload params:", params);
    return params;
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      console.log(`Accepting file: ${file.originalname}`);
      cb(null, true);
    } else {
      console.log(`Rejecting file: ${file.originalname}, invalid type: ${file.mimetype}`);
      cb(new Error('Invalid file type'), false);
    }
  }
});

module.exports = upload;