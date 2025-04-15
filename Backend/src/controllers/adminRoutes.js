const Book = require('../models/Books');

exports.adminRoutes = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    console.log('Book:', book);
    console.log('Book:', book.active);

    book.active = !book.active; 
    console.log("Toggle: ",book.active);
    await book.save();

    console.log('After toggle:', book.active);

    res.json({ active: book.active });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
