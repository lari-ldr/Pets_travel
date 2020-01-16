const   express       = require("express"),
        router        = express.Router(),
        middleware    = require("../middleware/index_middleware"),
        hotel         = require("../models/hotel"),
        Item          = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");

const {
    newPet,
    newPetPost,
    pet,
    petEditGet,
    petEditPut,
    petDestroy
} = require("../controllers/pets");

// ===========PETS===============

// add new pets GET
router.get("/user/:id/add_pet", middleware.isLoggedIn, newPet);

// add new pets POST
router.post("/user/:id/add_pet", middleware.isLoggedIn, newPetPost);

// show all your pets
router.get("/user/:id/show_pet", middleware.isLoggedIn, pet);

// edit your pets GET
router.get("/user/:id/show_pet/:pets_id/edit", middleware.isLoggedIn, petEditGet);

// edit your pets POST
router.put("/user/:id/show_pet/:pets_id", middleware.isLoggedIn, petEditPut);

// delete your pets
router.delete("/user/:id/show_pet/:pets_id", middleware.isLoggedIn, petDestroy);

module.exports = router;