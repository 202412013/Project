const Review = require("../models/Review");


exports.addComment = async(req, res)=>{
    try {
        const { bookId, rating, review } = req.body;
        const newReview = new Review({
          book: bookId,
          user: req.user.id,
          rating,
          review,
        });
        await newReview.save();
        const populatedReview = await Review.findById(newReview._id).populate("user", "fullName");
        res.status(201).json(populatedReview);
      } catch (err) {
        res.status(500).json({ error: "Failed to submit review." });
      }
}

exports.review = async(req,res)=>{
    try {
        const reviews = await Review.find({ book: req.params.bookId }).populate("user", "fullName");
        res.json(reviews);
      } catch (err) {
        res.status(500).json({ error: "Failed to get reviews." });
      }
}