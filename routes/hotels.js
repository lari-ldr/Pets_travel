const express       = require("express");
const router        = express.Router();
const faker         = require("faker");
const hotel         = require("../models/hotel");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

// ===================
// INDEX ROUTES
// ===================

// Main Page
router.get("/", function(req, res){
    res.render("main_page", {results: false});
});

// Result Page
router.get("/search", function(req, res, next){
    var perPage = 10;
    var pageQuery = parseInt(req.query.page); //page
    var pageNumber = pageQuery ? pageQuery : 1;
    var searchParams = req.query.search;

    Item.find({ $text: { $search: searchParams } }, {score: {$meta: "textScore"}})
                .sort( {score: {$meta: "textScore"}})
                .skip((perPage * pageNumber) - perPage)
                .limit(perPage)
                .exec(function(err, docs){
                    if(err){
                        console.log(err);
                    }
                    Item.countDocuments({ $text: { $search: searchParams } })
                    .exec(function(err, count){
                        if(err){
                            console.log(err);
                            res.redirect("/");
                        }
                        res.render("index", {
                            results: true,
                            list: docs,
                            search: req.query.search,
                            current: pageNumber,
                            pages: Math.ceil(count / perPage)
                            });
                    })
                    
                   
                })
});



// vou ter q pegar o query da procura q aparece e colocarna rota: http://localhost:3000/search?query=AUGUSTA
// Item's page - Shows more info about it
router.get("/search/:id", function(req, res){
    Item.findById(req.params.id).populate("comments").exec(function(err, showHotel){
        if(err || !showHotel){
            req.flash("error", "hotel not found!");
            console.log(err);
            res.redirect("back");
        } else {
            res.render("show", {hotel: showHotel});
        }
    });
});

// TO ADD NEW HOTELS TO THE DATABASE
router.get("/add-hotel", function(req, res){
    for(var i = 0; i < 10; i ++) {
        var item = new Item();
        // var category = ["urban", "beach", "mountain"];
        var image = [
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
            faker.image.image()
        ];

    item.title = faker.company.companyName(),
    item.street = faker.address.streetName();
    // item.city = faker.address.city();
    item.city = "Berlim";
    item.state = faker.address.state();
    item.country = faker.address.country();
    item.stars = faker.random.number(5, 1);
    item.image = image;
    item.description = faker.lorem.sentence();
    item.price = faker.commerce.price();
    // item.place = category[Math.floor(Math.random()*category.length)];
    
    item.save(function(err, newHotel){
        if(err){
            console.log(err);
        };
    });
    };
    res.redirect("/");
});

module.exports = router;