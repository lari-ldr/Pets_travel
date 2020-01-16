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
                {score: {$meta: "textScore"}})

db.hotels.find( { $text: { $search: "Berlim" }},
                {score: {$meta: "textScore"}}
               ).sort( {score: {$meta: "textScore"}}).pretty()

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
about PAGE and footer
fazer design responsive

node:

add controllers
asyn await
functions es7

deprecationWarning findo and modify etc


        <% include ./partials/bodyHeader %>

       <main class="o-main">
                     <% include ./partials/flashMessages %>
              <h1>Pets_Travel</h1>     
       </main>