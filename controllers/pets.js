const   express         = require("express"),
        User            = require("../models/user"),
        Pet             = require("../models/pets"),
        hotel           = require("../models/hotel"),
        Item            = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels")

module.exports = {

// add new pet GET
    newPet(req, res, next){
        res.render("pets");
    },

// add new pet POST
    newPetPost(req, res, next){
        User.findById(req.params.id, (err, user) =>{
            if(err){
                console.log(err);
                return err;
            } else{
                Pet.create(req.body.pet, function(err, pet){
                    if(err){
                        console.log(err);
                        req.flash("error", "Something went wrong!");
                        return err;
                    } else{
                        // add username and ID to pets
                        pet.author.id = req.user._id;
                        pet.author.username = req.user.username;
                        // save pets
                        pet.save();
                        // connect pet to the user
                        user.pets.push(pet);
                        // save the user
                        user.save();
                        req.flash("success", "Pet added!");
                        res.redirect("/user/"  + req.params.id + "/show_pet");
                    }
                });
            }
        })
        
    },

// show pets
    pet(req, res, next){
        User.findById(req.params.id, function(err, foundUser) {
            if(err) {
              req.flash("error", "Something went wrong!");
              res.redirect("/");
              return err;
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
              return err;
            }
            Pet.findById(req.params.pets_id, function(err, foundPets) {
                if(err) {
                  req.flash("error", "Something went wrong!");
                  res.redirect("/");
                  return err;
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
                return err;
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
                return err;
            } else {
                req.flash("success", "Pet deleted!");
                res.redirect("/user/"  + req.params.id + "/show_pet");
            };
        });
    }
}