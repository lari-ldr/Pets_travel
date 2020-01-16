var express       = require("express");
var router        = express.Router({mergeParams: true});
var middleware = require("../middleware/index_middleware");
var hotel         = require("../models/hotel");
var Comment       = require("../models/comment");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

// =====================
// COMMENTS ROUTE
// =====================

// Comments GET
router.get("/search/:id/comments/new", middleware.isLoggedIn, function(req, res){
    Item.findById(req.params.id, function(err, hotel){
        if(err){
            console.log(err);
        } else {
            res.render("comments_new", {hotel: hotel});
        }
    });
});

// Comments create POST
router.post("/search/:id/comments", middleware.isLoggedIn, function(req, res){
    // lookup hotel using ID
    Item.findById(req.params.id, function(err, hotel){
        if(err){
            console.log(err);
        } else {
            // create new comments
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    req.flash("error", "something is wrong");
                } else{
                    // add username and ID to comments
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    // connect new comment to the hotel
                    hotel.comments.push(comment);
                    hotel.save();
                    req.flash("success", "comment created!");
                    // redirect to hotel show page
                    res.redirect("/search/" + hotel._id);
                }
            });
        }
    });
});

// Edit and Update comments

// Edit comment GET
router.get("/search/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Item.findById(req.params.id, function(err, foundHotel){
        if(err || !foundHotel){
            req.flash("error", "no hotel found!");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            } else{
                res.render("comments_edit", {hotel_id: req.params.id, comment: foundComment});
            }
        });
    });
});

// Update comment PUT
router.put("/search/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/search/" + req.params.id);
        }
    });
}); //change the findByIdAndUpdate to the new one

// Delete/Destroy comments
router.delete("/search/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/search/" + req.params.id );
        };
    });
});


module.exports = router;