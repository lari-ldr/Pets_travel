const ul = document.querySelector(".authorPhotos");

const authorObj = [
{author: "Krista Mangulsone", link: "https://unsplash.com/@krista"},
{author: "Kate Stone Matheson", link: "https://unsplash.com/@kstonematheson"},
{author: "Conner Baker", link: "https://unsplash.com/@connerbaker"},
{author: "Timothy Meinberg", link: "https://unsplash.com/@timothymeinberg"},
{author: "Emerson Peters", link: "https://unsplash.com/@spemble"},
{author: "Dan Gold", link: "https://unsplash.com/@danielcgold"},
{author: "Javier Esteban", link: "https://unsplash.com/@javiestebaan"},
{author: "Jenn Evelyn-Ann", link: "#"},
{author: "Atanas Teodosiev", link: "https://unsplash.com/@teodosiev"},
{author: "Cat Mapper (Max Ogden)", link : "https://unsplash.com/@catmapper"},
{author: "Matthew Henry", link:  "https://unsplash.com/@matthewhenry"},
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
];

authorObj.forEach((element, url) =>{
    // for each author and link create a li and a-tag
    const li = document.createElement("li");
    const a = document.createElement("a");
    // for each author create a textContent
    a.textContent = element.author;
    // for each link create a href
    a.href = element.link;
    // add class to the a-tag
    a.classList.add("about-author");
    // append the li to ul and the a-tag to the li
    ul.appendChild(li);
    li.appendChild(a);
});