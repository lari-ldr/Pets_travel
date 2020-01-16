const express       = require("express");
const router        = express.Router();
const hotel         = require("../models/hotel");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");
const {
    register,
    registerPost,
    login,
    loginPost,
    logout,
    forgot,
    forgotPost,
    reset,
    resetPost
} = require("../controllers/authUser");

// ==========================
// AUTH ROUTEs - Client Side
// ==========================

// show register form
router.get("/register", register);

// Handle sign up logic form - post
router.post("/register", registerPost);

// Handle login form
router.get("/login", login);

// login route
router.post("/login", loginPost);

// handle logout route
router.get("/logout", logout);

// forgot password
router.get("/forgot", forgot);

router.post("/forgot", forgotPost);

// Reset password
router.get("/reset/:token", reset);

router.post("/reset/:token", resetPost);

module.exports = router;