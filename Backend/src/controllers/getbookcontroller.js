const Book = require('../models/Books');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
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


exports.getBookById = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);
    console.log(book);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.json(book);
  } catch (err) {
    console.error('Error fetching book by ID:', err);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};