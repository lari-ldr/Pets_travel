var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/pets_travel", { useNewUrlParser: true });

// PE TS

var petSchema = new mongoose.Schema({
    birth: [
        month = String,
        day = String,
        year = String,
    ],
    petName: String,
    dog: String,
    cat: String,
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