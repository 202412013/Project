const Book = require('../models/Books');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    console.log("Hello");

    // Group by category
    const groupedByCategory = books.reduce((acc, book) => {
      if (!acc[book.category]) {
        acc[book.category] = [];
      }
      acc[book.category].push(book);
      return acc;
    }, {});

    res.json(groupedByCategory);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};
