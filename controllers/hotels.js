const   express       = require("express"),
        router        = express.Router(),
        faker         = require("faker"),
        hotel         = require("../models/hotel"),
        Item          = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels")

module.exports = {

// Main Page
    mainPage(req, res, next){
        res.render("main_page", {results: false});
    },

// Search result page
    resultPage(req, res, next){
        let perPage = 10;
        let pageQuery = parseInt(req.query.page); //page
        let pageNumber = pageQuery ? pageQuery : 1;
        let searchParams = req.query.search;
    
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
    },

// Show page
    itemPage(req, res, next){
        Item.findById(req.params.id).populate("comments").exec(function(err, showHotel){
            if(err || !showHotel){
                req.flash("error", "hotel not found!");
                console.log(err);
                res.redirect("back");
            } else {
                res.render("show", {hotel: showHotel});
            }
        });
    }
}