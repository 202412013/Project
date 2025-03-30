const Book = require('../models/Books');

exports.uploadBook = async (req, res) => {
    try {
        const { title, author, category, description, inSubscription } = req.body;
        const publishedDate = req.body.publishedDate || new Date().toISOString().split('T')[0];

        if (!req.files || !req.files.bookFile || !req.files.coverImage) {
            return res.status(400).json({ error: "Book file and cover image are required" });
        }

        const bookFileUrl = req.files.bookFile[0].path;
        const coverImageUrl = req.files.coverImage[0].path;

        const newBook = new Book({
            title,
            author,
            category,
            description,
            inSubscription: inSubscription === 'true',
            bookFile: bookFileUrl,
            coverImage: coverImageUrl,
            publishedDate
        });

        await newBook.save();
        res.status(201).json({ message: "Book uploaded successfully!", book: newBook });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while uploading book" });
    }
};
