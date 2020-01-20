const mongoose      = require("mongoose"),
      faker         = require("faker"),
      hotel         = require("./models/hotel"),
      Comment       = require("./models/comment"),
      User          = require("./models/user"),
      Pet          = require("./models/pets"),
      Item = hotel.Mongoose.model("hotels", hotel.hotelSchema, "hotels")

mongoose.connect("mongodb://localhost:27017/pets_travel", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

let objImages = {
  imageUrban: [
      "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
  
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  
      "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  
      "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
  ], // todos os formatos landscape
  
  imageGreen: [
      "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1505820996465-b8bf9918eb60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1409&q=80",
  
      "https://images.unsplash.com/photo-1507038772120-7fff76f79d79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  
      "https://images.unsplash.com/photo-1564329471042-7b3bfa3c51c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1412&q=80",
  
      "https://images.unsplash.com/photo-1468912637438-582f3f543cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      
  ], //all photos landscape
  
  imageYellow: [
      "https://images.unsplash.com/photo-1575278609950-e100f1ae6e2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
  
      "https://images.unsplash.com/photo-1562512175-20a0ab99d26d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  
      "https://images.unsplash.com/photo-1552858725-693709cc17c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
  
      "https://images.unsplash.com/photo-1525683879097-8babce1c602a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
  
      "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
  ], // all photos portraits
  
  imageRed:[
  
      "https://images.unsplash.com/photo-1519143468229-4cde34927323?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1495754149474-e54c07932677?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1515362655824-9a74989f318e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      
      "https://images.unsplash.com/photo-1573717626258-e9d6879998f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  ], // all landscape
  
  imageBeach: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      
      "https://images.unsplash.com/photo-1563206098-9834172eeccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
  
      "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  
  ], // all landscapes
  
  imageBeachTwo: [
      "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
  
      "https://images.unsplash.com/photo-1565031491910-e57fac031c41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
      
      "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
  
      "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
  
      "https://images.unsplash.com/photo-1552858725-693709cc17c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
  
  ], // all portrait
  
  imageMoutain: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80",
  
      "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      
      "https://images.unsplash.com/photo-1566596943111-5f40d24cc3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1533900754888-f264fab96e92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80",
  ], // all landscapes
  
  imageMoutainTwo: [  
      "https://images.unsplash.com/photo-1573812331441-d99117496acb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1566596943111-5f40d24cc3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1501625010244-d49e891d2e7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  
      "https://images.unsplash.com/photo-1502304104451-b61947b321ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  ] // all landscapes
  
  };

randomPhotos = () =>{
  let random = Object.values(objImages);
  let finalRandom = random[Math.floor(Math.random() * random.length)];
    return finalRandom;
};

randomScore = () =>{
  let score = [ 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0,
                  3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5,
                  7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0
                ];
  let finalScore = score[Math.floor(Math.random()*score.length)];
  return finalScore;
};


const citiesAndCountry = [
  // {city: "New York",      country: "United States"},
  // {city: "Tokio",         country: "Japan"},
  // {city: "Amsterdam",     country: "Netherlands"},
  // {city: "Madrid",        country: "Espain"},
  // {city: "Oslo",          country: "Norway"},
  // {city: "Mexico City",   country: "Mexico"},
  // {city: "Berlim",        country: "Germany"},
  {city: "Johannesburg",  country: "South Africa"},
  // {city: "Vancouver",     country: "Canada"},
  // {city: "Lisbon",        country: "Portugal"},
  // {city: "Buenos Aires",  country: "Argentina"},
  // {city: "Lima",          country: "Peru"},
  // {city: "Santiago",      country: "Chile"},
  // {city: "São Paulo",     country: "Brazil"}
];

// ============
// SEED HOTELS
// ============

seedDB =()=>{

    let stars = [1,2,3,4,5];
    let randomStars = stars[Math.floor(Math.random() *stars.length)];

// loop through the const citiesAndCountry and add the other informations
  citiesAndCountry.forEach((seed) =>{
      seed.title = faker.company.companyName(),
      seed.street = faker.address.streetName();
      seed.stars = randomStars;
      seed.image = randomPhotos();
      seed.description = faker.lorem.paragraphs();
      seed.price = faker.commerce.price(10, 200);
// create the item
      Item.create(seed, (err, item) => {
        if(err){
          console.log(err);
          return err;
        } else{
          console.log("Hotel added to the DB");      
        }
      });
  });
    // GO TO THE DATABASE TO CREATE THE INDEX FOR THE SEARCH
  };

// ==============
// SEED COMMENTS
// ==============

attachComments = ()=>{
  // find hotels
  Item.find({}, (err, item)=>{
    if(err){
      console.log(err);
      return err;
    } else{
      // loop through each hotel to select them
      item.forEach((selectItem)=>{
        console.log(selectItem);
        // when select create a comment
        Comment.create( {
          title: faker.lorem.words(),
          content: faker.lorem.sentence(),
          score: randomScore(),
          created: Date.now(),
        }, (err, comment)=>{
          if(err){
            console.log(err);
            return err;
          } else{
        // find a existing user
        User.find({}, (err, user)=>{
          if(err){
            console.log(err);
            return err;
          } else{
            console.log(user);
            // loop throgh a existing user
            user.forEach((searchUser)=>{
              // catch the id and the username
              comment.author.id = searchUser._id;
              comment.author.username = searchUser.username;
            })
            // save comment
            comment.save();
            // connect hotel to the comments
            selectItem.comments.push(comment); // tem q selecionar o item
            // save the hotel
            selectItem.save();
          }
        })
      }
    })
      })
    }
  }) 
};

// To multiple the times of hotels in the DB

// for(var i = 1; i < 2; i++){
//   seedDB(i);
// }

// To multiple the times of comments in the hotel

// for(var i = 1; i < 3; i++){
//   attachComments(i);
// }

module.exports = {
  seedDB,
  attachComments
}