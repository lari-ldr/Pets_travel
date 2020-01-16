var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose")
    
mongoose.connect("mongodb://localhost:27017/pets_travel", { useNewUrlParser: true });

// USERS

var adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    birth: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {collection: "admins"}
);

adminSchema.plugin(passportLocalMongoose);

//User is the name of the collection (users)
module.exports = mongoose.model("admin", adminSchema);