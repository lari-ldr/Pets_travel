const express       = require("express");
const router        = express.Router({mergeParams: true});
const middleware = require("../middleware/index_middleware");
const hotel         = require("../models/hotel");
const Comment       = require("../models/comment");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");
const {
    commentsGet,
    commentsPost,
    commentEditGet,
    commentEditPut,
    commentDestroy
} = require("../controllers/comments");

// =====================
// COMMENTS ROUTE
// =====================

// Comments GET
router.get("/search/:id/comments/new", middleware.isLoggedIn, commentsGet);

// Comments create POST
router.post("/search/:id/comments", middleware.isLoggedIn, commentsPost);

// Edit and Update comments

// Edit comment GET
router.get("/search/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, commentEditGet);

// Update comment PUT
router.put("/search/:id/comments/:comment_id", middleware.checkCommentOwnership, commentEditPut); //change the findByIdAndUpdate to the new one

// Delete/Destroy comments
router.delete("/search/:id/comments/:comment_id", middleware.checkCommentOwnership, commentDestroy);


module.exports = router;