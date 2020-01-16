const express       = require("express");
const router        = express.Router();
const middleware = require("../middleware/index_middleware");
const hotel         = require("../models/hotel");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");
const {
    userLink,
    user,
    userEditGet,
    userEditPut,
    userDestroy,
    userReviews
} = require("../controllers/userInfos");

// ==========================
// USER INFOS
// ==========================

// show user links
router.get("/user/:id", middleware.isLoggedIn, userLink);

// show user data
router.get("/user/:id/info", middleware.isLoggedIn, user);

// edit user data
router.get("/user/:id/info/edit", middleware.isLoggedIn, userEditGet);

router.put("/user/:id/info", middleware.isLoggedIn, userEditPut);

// delete user account with all the user informations (pets, reviews etc...)
router.delete("/user/:id/info", middleware.isLoggedIn, userDestroy);

// show all user's reviews:
router.get("/user/:id/reviews", middleware.isLoggedIn, userReviews);

module.exports = router;