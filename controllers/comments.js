const express       = require("express");
const router        = express.Router({mergeParams: true});
const middleware = require("../middleware/index_middleware");
const hotel         = require("../models/hotel");
const Comment       = require("../models/comment");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");


module.exports = {
// Comments GET
    commentsGet(req, res, next){
        Item.findById(req.params.id, function(err, hotel){
            if(err){
                console.log(err);
            } else {
                res.render("comments_new", {hotel: hotel});
            }
        });
    },

// Comments POST
    commentsPost(req, res, next){
        // lookup hotel using ID
        Item.findById(req.params.id, function(err, hotel){
            if(err){
                console.log(err);
            } else {
                // create new comments
                Comment.create(req.body.comment, function(err, comment){
                    if(err){
                        console.log(err);
                        req.flash("error", "Something is wrong!");
                    } else{
                        // add username and ID to comments
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        // save comment
                        comment.save();
                        // connect new comment to the hotel
                        hotel.comments.push(comment);
                        hotel.save();
                        req.flash("success", "Comment created!");
                        // redirect to hotel show page
                        return res.redirect("/search/" + hotel._id);
                    }
                });
            }
        });
    },

// Comments Edit GET
    commentEditGet(req, res, next){
        Item.findById(req.params.id, function(err, foundHotel){
            if(err || !foundHotel){
                req.flash("error", "No hotel found!");
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
    },

// Comments Edit PUT
    commentEditPut(req, res, next){
        Comment.updateOne({_id: req.params.comment_id }, { $set: req.body.comment }, function(err, updatedComments){
            if(err){
                res.redirect("back");
            } else{
                req.flash("success", "Comment changed!");
                res.redirect("/search/" + req.params.id);
            }
        });
    },

// Comments Delete
    commentDestroy(req, res, next){
        Comment.deleteOne( {_id: req.params.comment_id }, function(err){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                req.flash("success", "Comment deleted!");
                res.redirect("/search/" + req.params.id );
            };
        });
    }
}