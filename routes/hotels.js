const   express       = require("express"),
        router        = express.Router(),
        hotel         = require("../models/hotel"),
        Item            = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

const {
    mainPage,
    resultPage,
    itemPage
} = require("../controllers/hotels");

// ===================
// INDEX ROUTES
// ====================

// Main Page
router.get("/", mainPage);

// About page
router.get("/about", (req, res) => {
    res.render("about");
});

// Result Page
router.get("/search", resultPage);

// Item's page - Shows more info about it
router.get("/search/:id", itemPage);

module.exports = router;