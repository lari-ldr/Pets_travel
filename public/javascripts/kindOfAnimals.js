const dog = document.getElementById("dog");
const cat = document.getElementById("cat");

// quando um é clicado o outro é desclicado. então, enquanto um é verdadeiro o outro tem que ser false

// primeiro emitir um alerta quando um deles é clicado
// quando um é verdadeiro o outro tem q ser false

dog.addEventListener("click", function(){
    if(dog.checked){
        cat.checked = false;
    }
    console.log("i'm a DOG and someone clicked on me");
});

cat.addEventListener("click", function(){
    if(cat.checked){
        dog.checked = false;
    }
    console.log("i'm a CAT and someone clicked on me");
});