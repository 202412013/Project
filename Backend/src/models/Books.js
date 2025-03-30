const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: String,

    coverImage: {
        type: String,
        required: true
    },
    bookFile: {
        type: String,
        required: true 
    },
    inSubscription: {
        type: Boolean,
        default: false
    },
    publishedDate: {
        type: Date,
        default: Date.now 
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
