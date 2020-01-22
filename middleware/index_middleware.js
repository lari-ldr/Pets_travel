const   hotel           = require("../models/hotel"),
        Comment         = require("../models/comment"),
        Item            = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels")

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

let middlewareObjs = {};

middlewareObjs.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Please, Login First!");
        res.redirect("/login");
    }
};

middlewareObjs.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                console.log(err);
                req.flash("error", "comment no found");
                res.redirect("back");
                return err;
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "you don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "you need to be logged in to do that");
        res.redirect("back");
    }
};

module.exports = middlewareObjs;