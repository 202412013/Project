const express = require('express');
const  profilepics  = require('../middleware/profilepics');
const { signup, googleSignup } = require('../controllers/signupController');
const { login } = require('../controllers/loginController');

const { forgotPassword, resetPassword } = require('../controllers/forgetPassword');
const { uploadBook } = require('../controllers/bookcontroller');
const bookstore = require('../middleware/bookstore');

const { addReview, getReviewsByBook } = require("../controllers/reviewcontroller");

const { createSubscriptionOrder, verifyPayment } = require("../controllers/Paymentcontroller");



const router = express.Router();



//  1)  Registration and Login API :- 
router.post('/signup', profilepics.single('profilePic'), signup);
router.post('/google-signup', googleSignup);
router.post('/login',login);

//  forget api
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


// 2) Books related API  :- 

router.post('/uploadbook', bookstore.fields([{ name: 'bookFile' }, { name: 'coverImage' }]), uploadBook);
router.post("/addreview", addReview);
router.get("/book/:bookId", getReviewsByBook);


// 3) Payment

router.post("/subscription/createorder", createSubscriptionOrder);
router.post("/verify-payment", verifyPayment);



module.exports = router;
