const sendEmail = require("../utils/SendEmail");
const User = require("../models/User");

exports.notifyUsersOfNewBook = async (newBook) => {
    try {
        const users = await User.find({}, "email");
        if (users.length === 0) {
            console.log("No users found to send notifications.");
            return;
        }

        const subject = "📚 New Book Added: " + newBook.title;
        const htmlContent = `
            <h2>Hello, Book Lovers! 📖</h2>
            <p>A new book has been added to our collection:</p>
            <h3>${newBook.title}</h3>
            <p><strong>Author:</strong> ${newBook.author}</p>
            <p><strong>Category:</strong> ${newBook.category}</p>
            <p><strong>Description:</strong> ${newBook.description}</p>
            <p>Click <a href="${process.env.CLIENT_URL}books">here</a> to check it out!</p>
            <br/>
            <p>Happy Reading! 📚✨</p>
        `;

        users.forEach(async (user) => {
            await sendEmail(user.email, subject, htmlContent);
        });

        console.log(`📩 Notifications sent to ${users.length} users.`);
    } catch (error) {
        console.error("Error sending notifications:", error);
    }
};
