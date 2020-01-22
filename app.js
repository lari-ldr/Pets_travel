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
      seeds        = require("./seeds")



// Requiring Routes
const hotelsRoutes       = require("./routes/hotels"),
      commentsRoutes     = require("./routes/comments"),
      authUserRoutes     = require("./routes/authUser"),
      userInfosRoutes    = require("./routes/userInfos"),
      petsRoutes         = require("./routes/pets")

const urlDB = process.env.DATABASEURL || "mongodb://localhost:27017/pets_travel";

// CONNECT WITH LOCAL DB
// mongoose.connect(urlDB, { useNewUrlParser: true }).then(() =>{
//     console.log("Connect to the Local DB Mongo");
// }).catch((err) =>{
//     console.log("err: " + err);
//     return err;
// });

// CONNECT WITH ATLAS CLOUD
mongoose.connect(process.env.DATABASEURLATLAS,{ useNewUrlParser: true }).then(() =>{
    console.log("Connect to the DB Mongo_Atlas");
}).catch((err) =>{
    console.log("err: " + err);
    return err;
});

mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

const Item = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

// ========================
// SEEDS HOTELS & COMMENTS
// ========================

// HOTELS
// seeds.seedDB();

// COMMENTS
// seeds.attachComments();

// ===================
// PASSPORT CONFIG.
// ===================

// setup express-session
app.use(require("express-session")({
    secret: process.env.EXPRESSSESSIONSECRET || "infections of a different kind of human",
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
// COMMENTS ROUTES
// =====================

app.use(commentsRoutes);

// ==========================
// AUTH ROUTEs
// ==========================

app.use(authUserRoutes);

// ==========================
// USER INFOS ROUTES
// ==========================

app.use(userInfosRoutes);

// ==========================
// PETS ROUTES
// ==========================

app.use(petsRoutes);

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