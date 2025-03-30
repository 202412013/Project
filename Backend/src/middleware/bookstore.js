const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let folder = 'books';
        if (file.mimetype.startsWith('image/')) {
            folder = 'book_covers'; 
        } else if (file.mimetype === 'application/pdf') {
            folder = 'books'; 
        }
        return {
            folder,
            allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
            public_id: file.originalname.split('.')[0]
        };
    }
});

const upload = multer({ storage });

module.exports = upload;
