const express       = require("express"),
      app           = express(),
      port          = 3000,
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      flash         = require("connect-flash"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override"),
      dotenv         = require('dotenv').config(),
      fs            = require("fs"),
      faker         = require("faker"),
      hotel         = require("./models/hotel"),
      Comment       = require("./models/comment"),
      User          = require("./models/user"),
      Pet           = require("./models/pets"),
      seedDB        = require ("./seeds")


// Requiring Routes
const hotelsRoutes       = require("./routes/hotels"),
      commentsRoutes     = require("./routes/comments"),
      authUserRoutes     = require("./routes/authUser")

mongoose.connect("mongodb://localhost:27017/pets_travel", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// generatedItem();

const Item = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

// seedDB();

// ===================
// PASSPORT CONFIG.
// ===================

// setup express-session
app.use(require("express-session")({
    secret: "infections of a different kind of human",
    resave: false,
    saveUninitialized: false,
}));

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use("User", new LocalStrategy(User.authenticate("User")));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ===================
// INDEX ROUTES
// ===================

app.use(hotelsRoutes);

// =====================
// COMMENTS ROUTE
// =====================

app.use(commentsRoutes);

// ==========================
// AUTH ROUTEs - Client Side
// ==========================

app.use(authUserRoutes);

// ====================================
// 404 page
app.get("*", function(req, res){
    res.send("This page doesn't exist!");
});


//Tell Express to listen for requests (start server)
app.listen(port, function(){
    console.log("Server Has Started on Port " + port);
});

//access: http://localhost:3000/