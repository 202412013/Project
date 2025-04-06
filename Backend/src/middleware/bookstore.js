const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      let folder = 'books';
      let resource_type = 'image';
  
      if (file.mimetype === 'application/pdf') {
        folder = 'books';
        resource_type = 'raw'; // Important for PDF
      } else if (file.mimetype.startsWith('image/')) {
        folder = 'book_covers';
      }
  
      return {
        folder,
        resource_type,
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        public_id: file.originalname.split('.')[0],
      };
    },
  });
  

const upload = multer({ storage });

module.exports = upload;
