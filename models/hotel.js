var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/pets_travel", { useNewUrlParser: true });

var hotelSchema = new mongoose.Schema({
    title: String,
    street: String,
    city: String,
    country: String,
    stars: Number,
    image: [String],
    description: String,
    price: Number,
    place: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
}, {collection: "hotels"}
);

//Hotel is the name of the collection (hotels)
module.exports = {Mongoose: mongoose, hotelSchema: hotelSchema}