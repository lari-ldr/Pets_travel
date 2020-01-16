var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/pets_travel", { useNewUrlParser: true });

// PETS

var petSchema = new mongoose.Schema({
    petName: String,
    birth: Date,
    dog: Boolean,
    cat: Boolean,
    breed: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
}, {collection: "pets"}
);

//User is the name of the collection (users)
module.exports = mongoose.model("pets", petSchema);