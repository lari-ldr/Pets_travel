const   express       = require("express"),
        router        = express.Router(),
        middleware    = require("../middleware/index_middleware"),
        hotel         = require("../models/hotel"),
        Item          = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

const {
    userProfile,
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
router.get("/user/:id", userProfile);

// show user data
router.get("/user/:id/info", middleware.isLoggedIn, user);

// edit user data
router.get("/user/:id/info/edit", middleware.isLoggedIn, userEditGet);

router.put("/user/:id/info", middleware.isLoggedIn, userEditPut);

// delete user account with all the user informations
router.delete("/user/:id/info", middleware.isLoggedIn, userDestroy);

// show all user's reviews:
router.get("/user/:id/reviews", middleware.isLoggedIn, userReviews);

module.exports = router;