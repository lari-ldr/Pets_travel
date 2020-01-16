const express       = require("express");
const router        = express.Router();
const faker         = require("faker");
const hotel         = require("../models/hotel");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");
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