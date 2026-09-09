const monBouton = document.querySelector("#burger-btn");
const menu = document.querySelector(".menu");

monBouton.addEventListener("click", function() {
    menu.classList.toggle("active");
});