// SEARCH ICON FOR MOBILE VERSION
const searchIcon = () =>{

    const   searchIcon  = document.querySelector(".search-mobile-icon"),
            searchBox   = document.querySelector(".formSearch");

    searchIcon.addEventListener("click", () =>{
        // when search icon is clicked appear search box
        searchBox.classList.toggle("formSearchClosed");
    });
}

searchIcon();

// NAV SLIDE AND BURGUER FOR MOBILE VERSION
const navSlide = ()=>{
    const   burger      = document.querySelector(".burger"),
            nav         = document.querySelector(".nav-links"),
            navLinks    = document.querySelectorAll(".nav-links li");
 
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

// TAKE OFF THE HOVER EFFECT OF THE COMPUTER VERSION
const hoverToToggle = (windowSize)=> {
    const   nav                 = document.querySelector(".nav-links"),
            dropdownContent     = document.querySelector(".dropdown-content"),
            dropdown            = document.querySelector(".dropdown"),
            dropdownHoverEffect = document.querySelector(".dropdownHoverEffect");

  if (windowSize.matches) { // If media query matches
    // remove dropdown hover effect
    dropdownHoverEffect.classList.remove("dropdownHoverEffect");
    // add nav-link class
    dropdownContent.classList.add("nav-links");
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