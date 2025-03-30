const Review = require("../models/Review");
const Book = require("../models/Books");

exports.addReview = async (req, res) => {
    try {
        console.log(req.body);
        const { bookId, userId, rating, review } = req.body;

        if (!bookId || !userId || !rating || !review) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        const bookExists = await Book.findById(bookId);
        if (!bookExists) {
            return res.status(404).json({ error: "Book not found" });
        }

        const newReview = new Review({ book: bookId, user: userId, rating, review });
        await newReview.save();

        res.status(201).json({ message: "Review added successfully!", review: newReview });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while adding review" });
    }
};



exports.getReviewsByBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const reviews = await Review.find({ book: bookId }).populate("user", "name"); // User ka name bhi fetch hoga

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this book" });
        }

        res.status(200).json(reviews);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while fetching reviews" });
    }
};
