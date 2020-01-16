const   express       = require("express"),
        router        = express.Router(),
        passport      = require("passport"),
        async         = require("async"),
        nodemailer    = require("nodemailer"),
        crypto        = require("crypto"),
        User          = require("../models/user"),
        hotel         = require("../models/hotel"),
        Item          = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels")

module.exports = {

// Register GET
    register(req, res, next){
        res.render("register");
    },
// Register POST
    registerPost(req, res, next){
        let newUser = new User({
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
                    req.flash("success", "Welcome to the Pets Travel, " + user.username + "!!!");
                    res.redirect("/");
                });
            }
        });
    },
// Login GET
    login(req, res, next){
        res.render("login");
    },
// Login POST
    loginPost(req, res, next) {
        passport.authenticate("User", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    })(req, res, next);
    },
// Logout GET
    logout(req, res, next){
        req.flash("error", "Logged you out!");
        req.logout();
        res.redirect("/");
    },
// Forgot password GET
    forgot(req, res, next){
        res.render("forgot");
    },
// Forgot POST
    forgotPost(req, res, next){
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf){
                    let token = buf.toString("hex");
                    done(err, token);
                });
            },
            function(token, done){
                User.findOne({ email: req.body.email }, function(err, user){
                    if(!user){
                        req.flash("error", "Email not found!");
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
                let smtpTransport = nodemailer.createTransport({
                                    tls: {
                        rejectUnauthorized: false
                    },
                    
                    service: "Gmail",
                    auth: {
                        user: "petstravel.infos@gmail.com",
                        pass: process.env.GMAIL_PASS
                    }
                });
                let mailOptions = {
                    to: user.email,
                    from: "petstravel.infos@gmail.com",
                    subject: "Pets_travel Password Reset",
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err){
                    console.log("mail sent");
                    req.flash("success", "An e-mail has been sent to " + user.email + " with further instructions.");
                    done(err, "done");
                });
            }
        ], function(err) {
            if(err) return next(err);
            res.redirect ("/forgot");
        });
    },
// Reset GET
    reset(req, res, next){
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user){
            if(!user){
                req.flash("error", "Password reset token is invalid or has been expired.");
                return res.redirect("/forgot");
            }
            res.render("reset", { token: req.params.token });
        });
    },
// Reset POST
    resetPost(req, res, next){
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
                        req.flash("error", "Passwords do not match!");
                        return res.redirect("back");
                    }
                });
            },
            function(user, done){
                let smtpTransport = nodemailer.createTransport({
                    tls: {
                        rejectUnauthorized: false
                    },
    
                    service: "Gmail",
                    auth: {
                        user: "petstravel.infos@gmail.com",
                        pass: process.env.GMAIL_PASS
                    }
                });
                let mailOptions = {
                    to: user.email,
                    from: "petstravel.infos@gmail.com",
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' + user.username +
                        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err){
                    req.flash("success", "Success! Your password has been changed.");
                    done(err);
                });
            }
        ], function(err){
            res.redirect("/");
        });
    },

}