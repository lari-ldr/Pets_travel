const navSlide = ()=>{
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links p");
 
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
    navSlide();

  } else {
    // remove nav-links
    dropdownContent.classList.remove("nav-links");
    dropdown.classList.remove("nav-links");
    // add back the hover effect
    dropdown.classList.add("dropdownHoverEffect");    
  }
};

const windowSize = window.matchMedia("(max-width:768px)");
hoverToToggle(windowSize) // Call listener function at run time
windowSize.addListener(hoverToToggle) // Attach listener function on state changes 