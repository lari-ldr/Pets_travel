const express       = require("express");
const router        = express.Router();
const faker         = require("faker");
const hotel         = require("../models/hotel");
const Item        = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

module.exports = {

// Main Page
    mainPage(req, res, next){
        res.render("main_page", {results: false});
    },

// Search result page
    resultPage(req, res, next){
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