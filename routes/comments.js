const   express       = require("express"),
        router        = express.Router({mergeParams: true}),
        middleware    = require("../middleware/index_middleware"),
        hotel         = require("../models/hotel"),
        Comment       = require("../models/comment"),
        Item          = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

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

// EDIT AND UPDATED COMMENTS

// Edit comment GET
router.get("/search/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, commentEditGet);

// Update comment PUT
router.put("/search/:id/comments/:comment_id", middleware.checkCommentOwnership, commentEditPut);

// Delete/Destroy comments
router.delete("/search/:id/comments/:comment_id", middleware.checkCommentOwnership, commentDestroy);


module.exports = router;