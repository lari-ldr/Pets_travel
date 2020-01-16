var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/pets_travel", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
var hotel         = require("./models/hotel");
var Comment       = require("./models/comment");
var Item = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels");
// var Datas    = require("./HotelItem.data.json");

  var data = [
    { title: "Ritz", street: "34 Rua Augusta", city: "Sao Paulo", state: "Sao Paulo", country: "Brazil", stars: 5, image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg", description: "et amet. Natus temporibus cumque. Eum harum deleniti et in harum qui.", price: 10.00, place: "urban" },
    { title: "Fitx", street: "81 Rua Augusta", city: "São Paulo", state: "São Paulo", country: "Brasil", stars: 2, image: "https://farm4.staticflickr.com/3795/10131043094_c1c0a1c859.jpg", description: "laborum voluptatibu perferendi. Ut impedit amet. Natus temporibus c in harum qui.", price: 3.00, place: "countryside" },
    { title: "Mitch", street: "6 Street Augusta", city: "Vancouver", state: "Brithish Columbia", country: "Canadá", stars: 4, image: "https://farm4.staticflickr.com/3796/10131087094_c1c0a1c859.jpg", description: "Ut impedit amet. Natus temporibus cumque. Eum harum deleniti et in harum qui.", price: 98.00, place: "beach" },
    { title: "Smith", street: "01 Avenida Augustino", city: "São Bernardo", state: "São Paulo", country: "Brasil", stars: 1, image: "https://farm4.staticflickr.com/3795/12131087094_c1c0a1c859.jpg", description: "Repellat laborum voluptatibus vel autem reprehenderit rem est hic.", price: 600.00, place: "countryside" },
    { title: "Aurora", street: "24 Avenida Augusto", city: "Sao Bernardo", state: "Sao Paulo", country: "Brazil", stars: 3, image: "https://farm4.staticflickr.com/3795/15131087094_c1c0a1c859.jpg", description: "Repellat e. Eum harum deleniti et in harum qui.", price: 34.00, place: "urban" }
]

    function seedDB(){
      //remove hotel items
      Item.deleteMany({}, function(err, hotel){
        if(err){
          console.log(err);
        } else{
          console.log("Removed items");
        }
      //add hotel items
      data.forEach(function (seed){
        Item.createIndex(seed, function(err, item){
          if(err){
            console.log(err);
          } else {
            console.log("added hotels");
            // Create a comment
            Comment.createIndex(
              {
                title: "this is a title",
                content: "this is the content",
                author: "DaVinci"
              }, function(err, comment){
                if(err){
                  console.log(err);
                } else{
                  item.comments.push(comment);
                  item.save();
                  console.log("created comment!!!");
                }
              });
          }
        });
      });
      });
      // GO TO THE DATABASE TO CREATE THE INDEX FOR THE SEARCH
    };

module.exports = seedDB;