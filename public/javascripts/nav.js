const searchIcon = () =>{
    const searchIcon = document.querySelector(".search-mobile-icon");
    const searchBox = document.querySelector(".formSearch");

    searchIcon.addEventListener("click", () =>{
        // quando clicar no search icon aparecer o searchbox

        searchBox.classList.toggle("formSearchClosed");
    })
}

searchIcon();

const navSlide = ()=>{
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
 
    burger.addEventListener("click", ()=>{ 
        // Toggle nav
            nav.classList.toggle("nav-active");
            
        // animate links
            navLinks.forEach((link, index)=>{
                if(link.style.animation){
                    link.style.animation = ``
                } else{
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
                }
            });
        // burger animation
            burger.classList.toggle("toggle");
        
    });
}

navSlide();

const hoverToToggle = (windowSize)=> {
    const nav = document.querySelector(".nav-links");
    const dropdownContent = document.querySelector(".dropdown-content");
    const dropdown = document.querySelector(".dropdown");
    const dropdownHoverEffect = document.querySelector(".dropdownHoverEffect");

  if (windowSize.matches) { // If media query matches
    // remove dropdown hover effect
    dropdownHoverEffect.classList.remove("dropdownHoverEffect");

    // add nav-link class
    dropdownContent.classList.add("nav-links");
    // dropdown.classList.add("nav-links");
    navSlide();

  } else {
    // remove nav-links
    
    dropdownContent.classList.remove("nav-links");
    dropdown.classList.remove("nav-links");

    // add back the hover effect

    dropdown.classList.add("dropdownHoverEffect");    
  }
};

const windowSize = window.matchMedia("(max-width:768px)", "(max-width:992px)");
hoverToToggle(windowSize) // Call listener function at run time
windowSize.addListener(hoverToToggle) // Attach listener function on state changes 

// navSlide();

// Outro problema: a tela passa do tamanho desktop para o mobile - OK; do mobile para deskopt - OK;
// MAS, quando ela volta do desktop para o mobile o click no burger não funciona mais; POR QUÊ?!