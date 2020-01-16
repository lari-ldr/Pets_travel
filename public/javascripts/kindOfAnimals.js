const dog = document.getElementById("dog");
const cat = document.getElementById("cat");

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