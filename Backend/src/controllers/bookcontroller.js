const Book = require('../models/Books'); 

exports.uploadBook = async (req, res) => {
  try {
    const { title, author, category, description, inSubscription } = req.body;

    if (!req.files || !req.files['bookFile'] || !req.files['coverImage']) {
      console.error("Missing files in request");
      return res.status(400).json({ 
        error: "Both book file and cover image are required",
        filesReceived: req.files ? Object.keys(req.files) : 'none'
      });
    }

    console.log("Book file:", req.files['bookFile'][0]);
    console.log("Cover image:", req.files['coverImage'][0]);

    const newBook = new Book({
      title,
      author,
      category,
      description,
      inSubscription: inSubscription === 'true',
      bookFile: req.files['bookFile'][0].path,
      coverImage: req.files['coverImage'][0].path,
      publishedDate: req.body.publishedDate || new Date().toISOString().split('T')[0],
      active,
    });

    console.log("Attempting to save book:", newBook.Active);
    await newBook.save();

    res.status(201).json({ 
      message: "Book uploaded successfully!", 
      book: newBook 
    });

  } catch (error) {
    console.error("Full upload error:", {
      message: error.message,
      stack: error.stack,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
    });
    
    res.status(500).json({ 
      error: "Server error while uploading book",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};