const express       = require("express");
const User          = require("../models/user");
const Pet          = require("../models/pets");
const hotel         = require("../models/hotel");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

module.exports = {

// add new pet GET
    newPet(req, res, next){
        res.render("pets");
    },

// add new pet POST
    newPetPost(req, res, next){
        Pet.create(req.body.pet, function(err, pet){
            if(err){
                console.log(err);
                req.flash("error", "Something went wrong!");
            } else{
                // add username and ID to pets
                pet.author.id = req.user._id;
                pet.author.username = req.user.username;
                // save pets
                pet.save();
                req.flash("success", "Pet added!");
                res.redirect("/user/"  + req.params.id + "/show_pet");
            }
        });
    },

// show pets
    pet(req, res, next){
        User.findById(req.params.id, function(err, foundUser) {
            if(err) {
              req.flash("error", "Something went wrong!");
              res.redirect("/");
            }
            Pet.find().where('author.id').equals(foundUser._id).exec(function(err, pets) {
              if(err) {
                req.flash("error", "Something went wrong!");
                res.redirect("/");
              }
              res.render("show_pet", {user: foundUser, pets: pets});
            })
          });
    },

// edit pet GET
    petEditGet(req, res, next){
        User.findById(req.params.id, function(err, foundUser) {
            if(err) {
              req.flash("error", "Something went wrong!");
              res.redirect("/");
            }
            Pet.findById(req.params.pets_id, function(err, foundPets) {
                if(err) {
                  req.flash("error", "Something went wrong!");
                  res.redirect("/");
                }
                res.render("pet_edit", {user: foundUser, pets: foundPets});
              });
          });
    },

// edit pet PUT
    petEditPut(req, res, next){
        Pet.updateOne( {_id: req.params.pets_id }, { $set: req.body.pets }, function(err, uptadedPet){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                req.flash("success", "Pet changed!!!");
                res.redirect("/user/"  + req.params.id + "/show_pet");
            }
        });
    },

// pet delete
    petDestroy(req, res, next){
        Pet.deleteOne( {_id: req.params.pets_id }, function(err){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                req.flash("success", "Pet deleted!");
                res.redirect("/user/"  + req.params.id + "/show_pet");
            };
        });
    }
}