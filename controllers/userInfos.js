const express       = require("express"),
      router        = express.Router(),
      User          = require("../models/user"),
      Pet           = require("../models/pets"),
      Comment       = require("../models/comment"),
      hotel         = require("../models/hotel"),
      Item          = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels")

module.exports = {

// user comments made it
userReviews(req, res, next){
  User.findById(req.params.id, function(err, foundUser) {
      if(err) {
        req.flash("error", "Something went wrong!");
        res.redirect("/");
        return err;
      }
      Comment.find().where('author.id').equals(foundUser._id).exec(function(err, comments) {
        if(err) {
          req.flash("error", "Something went wrong!");
          res.redirect("/");
          return err;
        } else{
          res.render("user_reviews", {user: foundUser, comments: comments});
        }
    });
  });
},

// user profile page
userProfile(req, res, next){
  User.findById(req.params.id).populate("pets").exec((err, user)=>{
    if(err){
      return err;
    } else{
      res.render("user", {user: user});
    }
  });
  },
  
// user inforomation and config
    user(req, res, next){
        User.findById(req.params.id, function(err, user){
            if(err){
                console.log(err);
                return err;
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
              return err;
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
                return err;
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
                return err;
            }
            Pet.deleteMany().where('author.id').equals(foundUser._id).exec(function(err) {
                if(err) {
                  req.flash("error", "Something went wrong!");
                  res.redirect("/");
                  return err;
                }
                Comment.deleteMany().where('author.id').equals(foundUser._id).exec(function(err) {
                    if(err) {
                      req.flash("error", "Something went wrong!");
                      res.redirect("/");
                      return err;
                    }
                    req.flash("success", "your account, pets e coments are dead! :(");
                    req.logout();
                    res.redirect("/");
                  });
              });
        });
    }

}