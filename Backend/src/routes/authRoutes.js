const express = require('express');
const  profilepics  = require('../middleware/profilepics');
const { signup, googleSignup } = require('../controllers/signupController');
const { login, getMe, logout } = require('../controllers/loginController');

const { verifyToken } = require('../middleware/authmiddleware');

const { forgotPassword, resetPassword } = require('../controllers/forgetPassword');
const { uploadBook } = require('../controllers/bookcontroller');
const  upload = require('../middleware/bookstore');

const { addReview, getReviewsByBook } = require("../controllers/reviewcontroller");

const { createSubscriptionOrder, verifyPayment } = require("../controllers/Paymentcontroller");

const { getAllBooks, getBookById } = require('../controllers/getbookcontroller');

const { checkSubscription } = require('../controllers/Subscriptionstatus'); 
const { adminRoutes } = require('../controllers/adminRoutes');
const { deleteuser, viewUser } = require('../controllers/manageUser');




const router = express.Router();



//  1)  Registration and Login API :- 
router.post('/signup', profilepics.single('profilePic'), signup);
router.post('/google-signup', googleSignup);
router.post('/login',login);
router.get('/me', verifyToken, getMe);
router.post('/logout', logout);

//  forget api
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


// 2) Books related API  :- 
router.post(
  '/uploadbook',
  upload.fields([
    { name: 'bookFile', maxCount: 2 },
    { name: 'coverImage', maxCount: 2 },
  ]),
  uploadBook
);

router.get('/getbooks', (req, res, next) => {
    // console.log("/getbooks route hit");
    next();
  }, getAllBooks);
  router.get('/book/:id', getBookById);

  
  // Admin side
  router.put('/admin/books/:id/toggle-active',adminRoutes);
  router.delete('/admin/users/:id',deleteuser);
  router.get('/admin/users',viewUser);

  
  router.get('/subscription-status', verifyToken, checkSubscription);




router.post("/addreview", addReview);
router.get("/book/:bookId", getReviewsByBook);


// 3) Payment

router.post("/subscription/createorder", createSubscriptionOrder);
router.post("/verify-payment", verifyPayment);



module.exports = router;
