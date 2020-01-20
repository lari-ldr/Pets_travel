const express       = require("express"),
      router        = express.Router(),
      User          = require("../models/user"),
      Pet           = require("../models/pets"),
      Comment       = require("../models/comment"),
      hotel         = require("../models/hotel"),
      Item          = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels")

module.exports = {

// user page
userProfile(req, res, next){
  User.findById(req.params.id).populate("pets").exec((err, user)=>{
    if(err){
      return err;
    } else{
      res.render("user", {user: user});
    }
  });
  },
// user infos
    user(req, res, next){
        User.findById(req.params.id, function(err, user){
            if(err){
                console.log(err);
            } else {
                res.render("user_info", { user: user });
            }
        });
    },

// user edit GET
    userEditGet(req, res, next){
        User.findById(req.params.id, function(err, user) {
            if(err) {
              req.flash("error", "Something went wrong!");
              res.redirect("/");
            } else {
                res.render("user_edit", {user: user});
            }
          });
    },

// user edit PUT
    userEditPut(req, res, next){
        User.updateOne({_id: req.params.id }, { $set: req.body.user }, function(err, uptadedUser){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                req.flash("success", "Profile changed!!!");
                res.redirect("/user/"  + req.params.id + "/info");
            }
        });
    },

// user delete
    userDestroy(req, res, next){
        User.deleteOne( {_id: req.params.id }, function(err, foundUser){
            if(err){
                console.log(err);
                res.redirect("back");
            }
            Pet.deleteMany().where('author.id').equals(foundUser._id).exec(function(err) {
                if(err) {
                  req.flash("error", "Something went wrong!");
                  res.redirect("/");
                }
                Comment.deleteMany().where('author.id').equals(foundUser._id).exec(function(err) {
                    if(err) {
                      req.flash("error", "Something went wrong!");
                      res.redirect("/");
                    }
                    req.flash("success", "your account, pets e coments are dead! :(");
                    req.logout();
                    res.redirect("/");
                  });
              });
        });
    },

    userReviews(req, res, next){
        User.findById(req.params.id, function(err, foundUser) {
            if(err) {
              req.flash("error", "Something went wrong!");
              res.redirect("/");
            }
            Comment.find().where('author.id').equals(foundUser._id).exec(function(err, comments) {
              if(err) {
                req.flash("error", "Something went wrong!");
                res.redirect("/");
              } else{
                res.render("user_reviews", {user: foundUser, comments: comments});
              }
          });
        });
    },

}