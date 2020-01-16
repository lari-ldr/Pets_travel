var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/pets_travel", { useNewUrlParser: true });

// COMMENTS

var commentSchema = new mongoose.Schema({
    title: String,
    content: String,
    score: String,
    created: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    },
}, {collection: "comments"}
);

//Comment is the name of the collection (comments)
module.exports = mongoose.model("comment", commentSchema);