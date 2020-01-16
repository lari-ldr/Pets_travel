const express       = require("express");
const router        = express.Router();
const passport      = require("passport");
const async         = require("async");
const nodemailer    = require("nodemailer");
const crypto        = require("crypto");
const middleware = require("../middleware/index_middleware");
const User          = require("../models/user");
const Pet          = require("../models/pets");
const Comment       = require("../models/comment");
const hotel         = require("../models/hotel");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");
const Admin          = require("../models/admin");

// ==========================
// AUTH ROUTEs - Client Side
// ==========================

router.get("/admin", function(req, res){
    res.render("admin");
});

// show register form
router.get("/register", function(req, res){
    res.render("register");
});

// Handle sign up logic form - post
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birth: req.body.birth
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err);
            return res.render("register");
        } else {
            passport.authenticate("User")(req, res, function(){
                req.flash("success", "Welcome to the Pets_travel " + user.username);
                res.redirect("/");
            });
        }
    });
});

// Handle login form
router.get("/login", function(req, res){
    res.render("login");
});

// login route
router.post("/login", passport.authenticate("User", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// handle logout route
router.get("/logout", function(req, res){
    req.flash("error", "Logged you out!");
    req.logout();
    res.redirect("/");
});

// reset password
router.get("/forgot", function(req, res){
    res.render("forgot");
});

router.post("/forgot", function(req, res, next){
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf){
                var token = buf.toString("hex");
                done(err, token);
            });
        },
        function(token, done){
            User.findOne({ email: req.body.email }, function(err, user){
                if(!user){
                    req.flash("error", "email not found");
                    return res.redirect("/forgot");
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err){
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                                tls: {
                    rejectUnauthorized: false
                },
                
                service: "Gmail",
                auth: {
                    user: "larissa.academico01@gmail.com",
                    pass: process.env.GMAIL_PASS
                }
            });
            var mailOptions = {
                to: user.email,
                from: "larissa.academico01@gmail.com",
                subject: "Pets_travel Password Reset",
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err){
                console.log("mail sent");
                req.flash("success", "An e-mail has been sent to " + user.email + " with further instructions");
                done(err, "done");
            });
        }
    ], function(err) {
        if(err) return next(err);
        res.redirect ("/forgot");
    });
});

router.get("/reset/:token", function(req, res){
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user){
        if(!user){
            req.flash("error", "Password reset token is invalid or has been expired.");
            return res.redirect("/forgot");
        }
        res.render("reset", { token: req.params.token });
    });
});

router.post("/reset/:token", function(req, res){
    async.waterfall([
        function(done){
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now() } }, function(err, user){
                if(!user){
                    req.flash("error", "Password token is invalid or has expired.");
                    return res.redirect("back");
                }
                if(req.body.password === req.body.confirm) { // da pra usar isso na hora de cadastrar tbm e com a senha
                    user.setPassword(req.body.password, function(err){
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function(err){
                            req.logIn(user, function(err){
                                done(err, user);
                            });
                        });
                    });
                } else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect("back");
                }
            });
        },
        function(user, done){
            var smtpTransport = nodemailer.createTransport({
                tls: {
                    rejectUnauthorized: false
                },

                service: "Gmail",
                auth: {
                    user: "larissa.academico01@gmail.com",
                    pass: process.env.GMAIL_PASS
                }
            });
            var mailOptions = {
                to: user.email,
                from: "larissa.academico01@gmail.com",
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' + user.username +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err){
                req.flash("success", "Sucess! Your password has been changed.");
                done(err);
            });
        }
    ], function(err){
        res.redirect("/");
    });
});

// Profile Page
router.get("/user/:id", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log(err);
        } else {
            res.render("user", {user: user})
        }
    });
});

// show user dados
router.get("/user/:id/info", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log(err);
        } else {
            res.render("user_info", { user: user });
        }
    });
});
// edit user dados
router.get("/user/:id/info/edit", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, user) {
        if(err) {
          req.flash("error", "Something went wrong.");
          res.redirect("/");
        } else {
            res.render("user_edit", {user: user});
        }
      });
});

router.put("/user/:id/info", middleware.isLoggedIn, function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, uptadedUser){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/");
        }
    });
});

// delete user account with all the user informations (pets, reviews etc...)
router.delete("/user/:id/info", middleware.isLoggedIn, function(req, res, next){
    User.findByIdAndDelete(req.params.id, function(err, foundUser){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        Pet.deleteMany().where('author.id').equals(foundUser._id).exec(function(err) {
            if(err) {
              req.flash("error", "Something went wrong.");
              res.redirect("/");
            }
            Comment.deleteMany().where('author.id').equals(foundUser._id).exec(function(err) {
                if(err) {
                  req.flash("error", "Something went wrong.");
                  res.redirect("/");
                }
                req.flash("success", "your account, pets e coments are dead");
                req.logout();
                res.redirect("/");
              });
          });
    });
});

// show all user's reviews:
router.get("/user/:id/reviews", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser) {
        if(err) {
          req.flash("error", "Something went wrong.");
          res.redirect("/");
        }
        Comment.find().where('author.id').equals(foundUser._id).exec(function(err, comments) {
          if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("/");
          }
          Item.find().where('author.id').equals(foundUser._id).exec(function(err, item) {
            if(err) {
              req.flash("error", "Something went wrong.");
              res.redirect("/");
            }
          res.render("user_reviews", {user: foundUser, comments: comments, item: item});
        })
      });
    });
});

// ===========PETS===============

// add new pets
router.get("/user/:id/add_pet", middleware.isLoggedIn, function(req, res){
    res.render("pets");
});

router.post("/user/:id/add_pet", middleware.isLoggedIn, function(req, res){
    Pet.create(req.body.pet, function(err, pet){
        if(err){
            console.log(err);
            req.flash("error", "something is wrong");
        } else{
            // add username and ID to pets
            pet.author.id = req.user._id;
            pet.author.username = req.user.username;
            // save pets
            pet.save();
            req.flash("success", "Pet added");
            // redirect to hotel show page
            res.redirect("/");
        }
    });
});

// show all your pets
router.get("/user/:id/show_pet", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser) {
        if(err) {
          req.flash("error", "Something went wrong.");
          res.redirect("/");
        }
        Pet.find().where('author.id').equals(foundUser._id).exec(function(err, pets) {
          if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("/");
          }
          res.render("show_pet", {user: foundUser, pets: pets});
        })
      });
});

// edit your pets
router.get("/user/:id/show_pet/:pets_id/edit", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser) {
        if(err) {
          req.flash("error", "Something went wrong.");
          res.redirect("/");
        }
        Pet.findById(req.params.pets_id, function(err, foundPets) {
            if(err) {
              req.flash("error", "Something went wrong.");
              res.redirect("/");
            }
            res.render("pet_edit", {user: foundUser, pets: foundPets});
          });
      });
});

router.put("/user/:id/show_pet/:pets_id", middleware.isLoggedIn, function(req, res){
    Pet.findByIdAndUpdate(req.params.pets_id, req.body.pets, function(err, uptadedPet){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/");
        }
    });
});
// delete your pets
router.delete("/user/:id/show_pet/:pets_id", middleware.isLoggedIn, function(req, res){
    Pet.findByIdAndDelete(req.params.pets_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/");
        };
    });
});

// user dados
// user pets dados
// Historico de hoteis visitados (futuramente vai se trasformar em reservas)
// avaliações (comentários)

module.exports = router;