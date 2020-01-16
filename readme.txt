OBJETIVO:

Essa API tem por objetivo estudar a logica de se criar um site que compara preços de hoteis como o trivago, mas
com o foco em hoteis para pets.

Step 01 - criar a busca - FEITO
Step 02 - aprimorar a busca
Step 03 - refinamento de busca

Montar todo o site usando o faker, pois a pratica de webscrapping e webcrawler pode dar problemas juridicos

************************************************************************
ARRUMAR O PROBLEMA DO ITEM'S PAGE VER A ROUTE E O INDEX EJS - FEITO!!!
************************************************************************

STEP 01:
==========================================FEITO!!!!=======================================================================
Fazer a busca = criação de busca simples feita em testes the chernocbyl - aplica-la ao pets_travel - FEITO
    MAS ANTES - separar os itens q vão para a database em tags (usando regular Expressions ou manualmente) - FEITO
    O que eu preciso: pegar o for escrito na area de busca e combinar com o nome que esta na database - FEITO
==========================================FEITO!!!!=======================================================================

STEP 02:
==========================================================================================================================
Criar uma normalização de busca - FEITO!!!
Criar os filtros de busca - podemos colocar na database se o item tem o filtro ou não ex: na montanha: sim e depois ao pesquisar conforme ao usar oss filtro se os filtros match the information in the item, appears otherwise don't) 
TESTAR NO TESTES DE chernocbyl

Filtros -   Lugar: montanha, praia ou cidade
            Faixa de preço: 20 até 900+
            Avaliação dos donos de pets

Check in date
Check out date
Number of pets

Usando o metodo do video no mongo shell funciona bem, é bom separar cidade de estado, para não ter conflito.
A pesquisa no mongo shell mostra acentos de não acentos, mas nao mostra diferença de idioma como Brazil e Brasil

=================================================================================================================================

FAZER A PAGINA DO ITEM:
    fazer a pagina - FEITO!
    colocar as infos do item - FEITO!
    Colocar mais de uma imagem nos items

Fazer a database - FEITO!

Fazer a seed da database - FEITO!
    colocar endereço completo - FEITO
    colocar varias fotos - feito mas arrumar o formato das fotos

Fazer as rotas de post
    User profile
    Company

==========================================================================================================================
db.hotels.insertMany(
    [
        { _id: 1, title: "Ritz", street: "34 Rua Augusta", city: "Sao Paulo", state: "Sao Paulo", country: "Brazil", stars: 5, image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg", description: "et amet. Natus temporibus cumque. Eum harum deleniti et in harum qui.", price: 10.00, place: "urban" },
        { _id: 2, title: "Fitx", street: "81 Rua Augusta", city: "São Paulo", state: "São Paulo", country: "Brasil", stars: 2, image: "https://farm4.staticflickr.com/3795/10131043094_c1c0a1c859.jpg", description: "laborum voluptatibu perferendi. Ut impedit amet. Natus temporibus c in harum qui.", price: 3.00, place: "countryside" },
        { _id: 3, title: "Mitch", street: "6 Street Augusta", city: "Vancouver", state: "Brithish Columbia", country: "Canadá", stars: 4, image: "https://farm4.staticflickr.com/3796/10131087094_c1c0a1c859.jpg", description: "Ut impedit amet. Natus temporibus cumque. Eum harum deleniti et in harum qui.", price: 98.00, place: "beach" },
        { _id: 4, title: "Smith", street: "01 Avenida Augustino", city: "São Bernardo", state: "São Paulo", country: "Brasil", stars: 1, image: "https://farm4.staticflickr.com/3795/12131087094_c1c0a1c859.jpg", description: "Repellat laborum voluptatibus vel autem reprehenderit rem est hic.", price: 600.00, place: "countryside" },
        { _id: 5, title: "Aurora", street: "24 Avenida Augusto", city: "Sao Bernardo", state: "Sao Paulo", country: "Brazil", stars: 3, image: "https://farm4.staticflickr.com/3795/15131087094_c1c0a1c859.jpg", description: "Repellat e. Eum harum deleniti et in harum qui.", price: 34.00, place: "urban" }
    ]
)

db.hotels.insertMany(
    [
        { title: "Ritz", street: "34 Rua Augusta", city: "Sao Paulo", state: "Sao Paulo", country: "Brazil", stars: 5, image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg", description: "et amet. Natus temporibus cumque. Eum harum deleniti et in harum qui.", price: 10.00, place: "urban" },
        { title: "Fitx", street: "81 Rua Augusta", city: "São Paulo", state: "São Paulo", country: "Brasil", stars: 2, image: "https://farm4.staticflickr.com/3795/10131043094_c1c0a1c859.jpg", description: "laborum voluptatibu perferendi. Ut impedit amet. Natus temporibus c in harum qui.", price: 3.00, place: "countryside" },
        { title: "Mitch", street: "6 Street Augusta", city: "Vancouver", state: "Brithish Columbia", country: "Canadá", stars: 4, image: "https://farm4.staticflickr.com/3796/10131087094_c1c0a1c859.jpg", description: "Ut impedit amet. Natus temporibus cumque. Eum harum deleniti et in harum qui.", price: 98.00, place: "beach" },
        { title: "Smith", street: "01 Avenida Augustino", city: "São Bernardo", state: "São Paulo", country: "Brasil", stars: 1, image: "https://farm4.staticflickr.com/3795/12131087094_c1c0a1c859.jpg", description: "Repellat laborum voluptatibus vel autem reprehenderit rem est hic.", price: 600.00, place: "countryside" },
        { title: "Aurora", street: "24 Avenida Augusto", city: "Sao Bernardo", state: "Sao Paulo", country: "Brazil", stars: 3, image: "https://farm4.staticflickr.com/3795/15131087094_c1c0a1c859.jpg", description: "Repellat e. Eum harum deleniti et in harum qui.", price: 34.00, place: "urban" }
    ]
)

db.hotels.createIndex( {title: "text", city: "text"} )

db.hotels.find( { $text: { $search: "são" } } )

db.hotels.find( { $text: { $search: "são" }},
                {score: {$meta: "textScore"}})

db.hotels.find( { $text: { $search: "são paulo brasil" }},
                {score: {$meta: "textScore"}}
               ).sort( {score: {$meta: "textScore"}}).pretty()

               db.hotels.find( { $text: { $search: "são" } } )

---------------------------------------------------------------------------
db.hotels.createIndex( {title: "text", city: "text"} )

db.hotels.find( { $text: { $search: "Berlim" } } )

db.hotels.find( { $text: { $search: "Berlim" }},
                {score: {$meta: "textScore"}}).pretty()

db.hotels.find( { $text: { $search: "Berlim" }},
                {score: {$meta: "textScore"}}
               ).sort( {score: {$meta: "textScore"}}).pretty()

db.hotels.drop()

Got "text index required for $text query"  code 27
---------------------------------------------------------------------------------
COMMENTS:

db.comments.insertMany(
    [
        {title: "Bananas, Apples and Trees", content: "lorenipcudaushdaudhauhdhda", author: "Bart"},
        {title: "Cigars, whisky and cats", content: "loreniauhdhda", author: "Lisa"},
        {title: "Mario Kart, nilism and windows", content: "loushdaudhauhdhda", author: "Amoeado"}
    ]
)

--------------------------------------------------------------------------------------------------------------------

// se montanha ou praia ou cidade igual verdadeiro, show restults
// se preço igual, show results
// se avaliação igual a numero x, show results (fazer uma database relacional)

SOLUÇÃO DEPOIS DE FAZER A BUSCA USAR O TUTORIAL BUILD A FILTERABLE LIST WITH VANILLA JS

Usar array.filter method?

selecionar os filtros em js_front.js - feito
levar a informação até a rota de pesquisa do arquivo busca.js
combinar as infos
e mostrar os resultados dos resultados

One: many
user ----- historico de hotels vistos
     ----- comments of the hotels
     ----- rating of the hotels

rating of the hotels have to change based on the vote of the users

relacionar urban, mountain, countryside and beach to the item in the database
fazer uma outra coleção the imagens, cada hotel tem uma coleção de imagens propria (até 5)

se a pessoa escolher mais de um pet, multiplicar o valor do hotel por depois

Company hotels ---- different hotels

=======================

CSS to do list:

hover buttons - feito
box shadows - feito
change de password, login e register style - feito
fixed navBar - feito
style the flash messages - feito
main-page - feito
about PAGE
footer - feito
fazer design responsive - feito

node:

add controllers - feito
asyn await
functions es7
deprecationWarning findo and modify etc

=====================================================================================

To read later

Search and Filter
https://gist.github.com/nax3t/6d7ace706501562332e456d9cb1904ab

Yelp camp
https://github.com/nax3t/yelp-camp-refactored/blob/password-reset/views/campgrounds/show.ejs

async waterfall
https://caolan.github.io/async/v3/

hasing security
https://crackstation.net/hashing-security.htm

nodemailer
https://nodemailer.com/about/

getting to know async functions
https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee

Important links

https://stackoverflow.com/questions/16626735/how-to-loop-through-an-array-containing-objects-and-access-their-properties

https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object

https://raamdev.com/2008/making-checkboxes-behave-like-radio-buttons/?unapproved=237452&moderation-hash=59757c5fb641bc19f7d9ca1c61100329#comment-237452

https://line25.com/tutorials/how-to-create-a-cool-anaglyphic-text-effect-with-css

https://blog.logrocket.com/css-transitions-101-lets-animate-a-toggle-button-icon-333967f5b971/

https://gomakethings.com/controlling-the-transition-timing-of-show-and-hide-methods-with-vanilla-javascript/

https://gomakethings.com/how-to-show-and-hide-elements-with-vanilla-javascript/

https://codepen.io/vanderlanth/pen/BoNLvq

https://stackoverflow.com/questions/33866968/how-to-apply-hover-effect-to-2-different-elements

https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array

https://stackoverflow.com/questions/17624307/javascript-call-a-function-several-times-with-the-arguments/17624356

https://www.freecodecamp.org/news/the-complete-guide-to-loops-in-javascript-f5e242921d8c/

===================================

para cada cidade é necessario 20 hoteis com 5 imagens aleatorias cada

loop por cada cidade
add 20 hoteis com 5 imagens cada

hotel frente, quarto, corredor, area comum

const objImages = [
imageUrban: {
    photo: "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",

    photo: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

    photo: "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

    photo: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

}, // todos os formatos landscape

imageGreen: {
    photo: "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1505820996465-b8bf9918eb60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1409&q=80",

    photo: "https://images.unsplash.com/photo-1507038772120-7fff76f79d79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

    photo: "https://images.unsplash.com/photo-1564329471042-7b3bfa3c51c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1412&q=80",

    photo: "https://images.unsplash.com/photo-1468912637438-582f3f543cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
    
}, //all photos landscape

imageYellow: {
    photo: "https://images.unsplash.com/photo-1575278609950-e100f1ae6e2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",

    photo: "https://images.unsplash.com/photo-1562512175-20a0ab99d26d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

    photo: "https://images.unsplash.com/photo-1552858725-693709cc17c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",

    photo: "https://images.unsplash.com/photo-1525683879097-8babce1c602a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",

    photo: "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
}, // all photos portraits

imageRed:{

    photo: "https://images.unsplash.com/photo-1519143468229-4cde34927323?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1495754149474-e54c07932677?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1515362655824-9a74989f318e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
    
    photo: "https://images.unsplash.com/photo-1573717626258-e9d6879998f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
}, // all landscape

imageBeach: {
    photo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    
    photo: "https://images.unsplash.com/photo-1563206098-9834172eeccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",

    photo: "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

}, // all landscapes

imageBeachTwo: {
    photo: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",

    photo: "https://images.unsplash.com/photo-1565031491910-e57fac031c41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
    
    photo: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",

    photo: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",

    photo: "https://images.unsplash.com/photo-1552858725-693709cc17c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",

}, // all portrait

imageMoutain: {
    photo: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80",

    photo: "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    
    photo: "https://images.unsplash.com/photo-1566596943111-5f40d24cc3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    
    photo: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1533900754888-f264fab96e92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80",
}, // all landscapes

imageMoutainTwo: {   
    photo: "https://images.unsplash.com/photo-1573812331441-d99117496acb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1566596943111-5f40d24cc3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1501625010244-d49e891d2e7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    photo: "https://images.unsplash.com/photo-1502304104451-b61947b321ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
} // all landscapes

];


=================================

const imgUrban = [
    "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",

    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

    "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

    "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

] // todos os formatos landscape

const imgGreen = [
    "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1505820996465-b8bf9918eb60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1409&q=80",

    "https://images.unsplash.com/photo-1507038772120-7fff76f79d79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

    "https://images.unsplash.com/photo-1564329471042-7b3bfa3c51c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1412&q=80",

    "https://images.unsplash.com/photo-1468912637438-582f3f543cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
    
] //all photos landscape

const imgYellow = [
    "https://images.unsplash.com/photo-1575278609950-e100f1ae6e2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",

    "https://images.unsplash.com/photo-1562512175-20a0ab99d26d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

    "https://images.unsplash.com/photo-1552858725-693709cc17c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",

    "https://images.unsplash.com/photo-1525683879097-8babce1c602a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",

    "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
] // all photos portraits

const imgRed = [
    "https://images.unsplash.com/photo-1519143468229-4cde34927323?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1495754149474-e54c07932677?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1515362655824-9a74989f318e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
    
    "https://images.unsplash.com/photo-1573717626258-e9d6879998f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
] // all landscape

const imgBeach = [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1541971875076-8f970d573be6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    
    "https://images.unsplash.com/photo-1563206098-9834172eeccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",

    "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",

] // all landscapes

const imgBeachTwo =[
    
    "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1565031491910-e57fac031c41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
    
    "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",

    "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",

    "https://images.unsplash.com/photo-1552858725-693709cc17c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",

] // all portrait

const imgMoutain = [
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80",

    "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    
    "https://images.unsplash.com/photo-1566596943111-5f40d24cc3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1533900754888-f264fab96e92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80",
] // all landscapes

const imgMoutainTwo = [
    "https://images.unsplash.com/photo-1573812331441-d99117496acb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1566596943111-5f40d24cc3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1501625010244-d49e891d2e7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",

    "https://images.unsplash.com/photo-1502304104451-b61947b321ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
] // all landscapes

===================================================================================

// const photos = [
//   "https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
//   "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1479502806991-251c94be6b15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
//   "https://images.unsplash.com/photo-1505820996465-b8bf9918eb60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1409&q=80",
//   "https://images.unsplash.com/photo-1507038772120-7fff76f79d79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
//   "https://images.unsplash.com/photo-1564329471042-7b3bfa3c51c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1412&q=80",
//   "https://images.unsplash.com/photo-1575278609950-e100f1ae6e2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
//   "https://images.unsplash.com/photo-1562512175-20a0ab99d26d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
//   "https://images.unsplash.com/photo-1468912637438-582f3f543cba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
//   "https://images.unsplash.com/photo-1525683879097-8babce1c602a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
//   "https://images.unsplash.com/photo-1519143468229-4cde34927323?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1495754149474-e54c07932677?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1515362655824-9a74989f318e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
//   "https://images.unsplash.com/photo-1573717626258-e9d6879998f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
//   "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1541971875076-8f970d573be6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
//   "https://images.unsplash.com/photo-1563206098-9834172eeccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
//   "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",    
//   "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
//   "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
//   "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
//   "https://images.unsplash.com/photo-1552858725-693709cc17c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
//   "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80",
//   "https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1565031491910-e57fac031c41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80",
//   "https://images.unsplash.com/photo-1564273795917-fe399b763988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
//   "https://images.unsplash.com/photo-1533900754888-f264fab96e92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1510&q=80",
//   "https://images.unsplash.com/photo-1573812331441-d99117496acb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1566596943111-5f40d24cc3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1501625010244-d49e891d2e7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//   "https://images.unsplash.com/photo-1502304104451-b61947b321ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
// ];

// randomPhotos = () =>{
//   var photoArr = [];
//     for(var i = 0; i < 5; i++){
//         var rand = photos[Math.floor(Math.random()* 16)];
//         photoArr.push(rand);
//     }
//     return photoArr;
// };


========================================================================================

{author: "Marten Bjork", link:  "https://unsplash.com/@martenbjork"},
{author: "Rhema Kallianpur", link:  "https://unsplash.com/@rhemakallianpur"},
{author: "mark champs", link:  "https://unsplash.com/@markchamps21"},
{author: "Olexandr Ignatov", link:  "https://unsplash.com/@olexandrignatov"},
{author: "Tim Photoguy", link:  "https://unsplash.com/@tim0at0unsplash"},
{author: "Thought Catalog", link:  "https://unsplash.com/@thoughtcatalog"},
{author: "Annie Spratt", link:  "https://unsplash.com/@anniespratt"},
{author: "Man Pan", link:  "https://unsplash.com/@jazzband"},
{author: "Frank Eiffert", link:  "https://unsplash.com/@feiffert"},
{author: "Jungwoo Hong", link:  "https://unsplash.com/@oowgnuj"},
{author: "Sasha • Stories", link:  "https://unsplash.com/@sanfrancisco"},
{author: "@plqml", link:  "https://unsplash.com/@plqml"},
{author: "Rhea Lofranco", link:  "https://unsplash.com/@rheamael"},
{author: "Valeriia Bugaiova", link:  "https://unsplash.com/@bugaiova_valeriya"},
{author: "Michelle Onzi", link:  "https://unsplash.com/@chelly11"},
{author: "Travis Grossen", link:  "https://unsplash.com/@tgrossen"},
{author: "lucas Favre", link: "https://unsplash.com/@we_are_rising"},
{author: "Petrisor Ionel", link:  "https://unsplash.com/@petrisorionel"},
{author: "Luca Bravo", link:  "https://unsplash.com/@lucabravo"},
{author: "Luke Insoll", link:  "https://unsplash.com/@luke_abroad"},
{author: "Manuel Moreno", link:  "https://unsplash.com/@manuelmx"},
{author: "Jp Valery", link:  "https://unsplash.com/@jpvalery"},
{author: "Timothy Buck", link:  "https://unsplash.com/@timothybuck"},
{author: "Gerson Repreza", link:  "https://unsplash.com/@gersonrepreza"},
{author: "Mateo Fernández", link:  "https://unsplash.com/@_mateoofdez_"},
{author: "Christian Lambert", link:  "https://unsplash.com/@_christianlambert"},
{author: "runnyrem", link:  "https://unsplash.com/@runnyrem"},
{author: "Pratama Ryan", link:  "https://unsplash.com/@prtmryan"},
{author: "Tony Yakovlenko", link:  "https://unsplash.com/@tonyyakovlenko"}