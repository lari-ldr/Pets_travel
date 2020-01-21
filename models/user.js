const   mongoose                    = require("mongoose"),
        passportLocalMongoose       = require("passport-local-mongoose")
    
mongoose.connect("mongodb://localhost:27017/pets_travel", { useNewUrlParser: true });

// USERS

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    from: String,
    aboutMe: String,
    pets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pets"
        }
    ],
    birth: [
        month = String,
        day = String,
        year = String,
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {collection: "users"}
);

userSchema.plugin(passportLocalMongoose);

//User is the name of the collection (users)
module.exports = mongoose.model("user", userSchema);