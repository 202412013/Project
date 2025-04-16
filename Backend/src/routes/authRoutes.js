const express = require('express');
const  profilepics  = require('../middleware/profilepics');
const { signup, googleSignup } = require('../controllers/signupController');
const { login, getMe, logout } = require('../controllers/loginController');
const { forgotPassword, resetPassword } = require('../controllers/forgetPassword');
const { uploadBook } = require('../controllers/bookcontroller');
const  upload = require('../middleware/bookstore');
const { createSubscriptionOrder, verifyPayment } = require("../controllers/Paymentcontroller");
const { getAllBooks, getBookById } = require('../controllers/getbookcontroller');
const { checkSubscription } = require('../controllers/Subscriptionstatus'); 
const { adminRoutes } = require('../controllers/adminRoutes');
const { deleteuser, viewUser } = require('../controllers/manageUser');



const { addComment, review } = require('../controllers/review');
// const { addReview, getReviewsByBook } = require("../controllers/reviewcontroller");
const { verifyToken } = require('../middleware/authmiddleware');


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

  
// 3) Admin side
  router.put('/admin/books/:id/toggle-active',adminRoutes);
  router.delete('/admin/users/:id',deleteuser);
  router.get('/admin/users',viewUser);

  

// 4) Subscription API
router.get('/subscription-status', verifyToken, checkSubscription);



// 5) Review API
router.post("/addComment",verifyToken, addComment);
router.get("/reviews/:bookId",review);


// router.get("/book/:bookId", getReviewsByBook);


// 6) Payment API
router.post("/subscription/createorder", createSubscriptionOrder);
router.post("/verify-payment", verifyPayment);



module.exports = router;
