const Book = require('../models/Books');
const { notifyUsersOfNewBook } = require("./Notificationcontroller");
// const cloudinary = require('../config/cloudinary');

exports.uploadBook = async (req, res) => {
    try {

        console.log("Hello");
        const { title, author, category, description, inSubscription } = req.body;

      console.log('BODY:', req.body);
      console.log('FILES:', req.files);

        if (!req.files || !req.files['bookFile'] || !req.files['coverImage']) {
            return res.status(400).json({ error: "Book file and cover image are required" });
          }
          
          const bookFileUrl = req.files['bookFile'][0].path.replace("/image/upload", "/raw/upload");
          const coverImageUrl = req.files['coverImage'][0].path;

          
          const newBook = new Book({
            title,
            author,
            category,
            description,
            inSubscription: inSubscription === 'true',
            bookFile: bookFileUrl,
            coverImage: coverImageUrl,
            publishedDate: req.body.publishedDate || new Date().toISOString().split('T')[0],
          });
          

        await newBook.save();

        await notifyUsersOfNewBook(newBook);  

        res.status(201).json({ message: "Book uploaded successfully & notifications sent!", book: newBook });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: error.message || "Server error while uploading book" });
    }
};
