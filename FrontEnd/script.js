//Récupération des données de l'API
const response = await fetch("http://localhost:5678/api/works");
console.log(response);
const works = await response.json();
console.log(works);

const respbis = await fetch("http://localhost:5678/api/categories/");
console.log(respbis);
const categories = await respbis.json();
console.log(categories);

//Récupération du token dans le Local Storage
const token = window.localStorage.getItem("token");

//Si le token est présent, mise à jour du html pour passer en mode édition. Si non, création des filtres
if(token){
    console.log(token);

    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const div = document.createElement("div");
    div.setAttribute("class", "editMode");
    const icon = document.createElement("i");
    icon.setAttribute("class", "fa-regular fa-pen-to-square");
    const p = document.createElement("p");
    p.innerText = "Mode édition";
    body.appendChild(div);
    div.appendChild(icon);
    div.appendChild(p);
    header.before(div);
    
    const navEdit = document.querySelector("nav li a");
    navEdit.remove();
    const logout = document.createElement("li");
    const logOut = document.createElement("a");
    logOut.setAttribute("href", "index.html");
    logOut.innerText = "logout";
    const nav = document.querySelector("nav ul");
    const insta = document.querySelector(".insta");
    nav.appendChild(logout);
    logout.appendChild(logOut);
    insta.before(logout);

    logout.addEventListener("click", () =>{
        window.localStorage.removeItem("token");
    });

    const portfolio = document.querySelector("#portfolio h2");
    const span = document.createElement("span");
    const a = document.createElement("a");
    a.setAttribute("href", "#modal");
    a.setAttribute("class", "js-modal");
    a.innerText = "modifier";
    const iconn = document.createElement("i");
    iconn.setAttribute("class", "fa-regular fa-pen-to-square");
    portfolio.appendChild(span);
    span.appendChild(iconn);
    span.appendChild(a);
    
} else {
    
    //Fonction qui crée les boutons "filtres" et qui active l'écouteur d'évènement
    function createFilterButton(value, isAll) {
        const filterI = document.createElement("input");
        filterI.setAttribute("type", "button");
        filterI.setAttribute("value", value);
        filterI.classList.add("noClick");
        
        if (isAll) {
            filterI.addEventListener("click", () => {
                document.querySelector(".gallery").innerHTML = "";
                generWorks(works);
                filterClass(filterI);
            });
        } else {
            const id = categories.find((cat) => cat.name === value).id;
            filterI.addEventListener("click", () => {
                const filterCategory = works.filter((work) => work.categoryId === id);
                document.querySelector(".gallery").innerHTML = "";
                generWorks(filterCategory);
                filterClass(filterI);
            });
        };
        
        return filterI;
    };
    
    //Fonction qui ajoute la classe .click et enlève la classe .noClick sur le filtre sélectionné et inversément sur les filtres non sélectionnés
    function filterClass(filterElement) {
        const allFilters = document.querySelectorAll(".filter input");
        allFilters.forEach((filter) => {
            filter.classList.remove("click");
            filter.classList.add("noClick");
        });
        
        filterElement.classList.remove("noClick");
        filterElement.classList.add("click");
    };
    
    //Fonction qui crée les filtres
    function createFilters(categories) {
        const filters = document.querySelector(".filter");
        const filterAll = createFilterButton("Tous", true);
        filters.appendChild(filterAll);
        
        categories.forEach((input) => {
            const filter = createFilterButton(input.name, false);
            filters.appendChild(filter);
        });
    }
    
    function filters(categories) {
        createFilters(categories);
    };
    
    filters(categories);
    
};

//Fonction qui va générer les travaux
function generWorks(works) {
    works.forEach((figure) => {
        console.log(figure);
        //Récupère l'élément du DOM qui va accueillir les travaux de l'architecte
        const divGallery = document.querySelector(".gallery");
        //Crée une balise dédiée à un des travaux
        const worksElement = document.createElement("figure");
        
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = figure.title;
        //Rattache la balise figure à la div .gallery
        divGallery.appendChild(worksElement);
        //Rattache l'image et le titre à la balise figure
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
        
        console.log(worksElement);
        console.log(imageElement);
        console.log(titleElement);
        
        const categoryId = figure.category;
        console.log(categoryId);
    });
};

generWorks(works);

let modal = null;
const modal1 = document.querySelector("#modal1");
const modal2 = document.querySelector("#modal2");
const focusableSelector= "button, a, input, textarea";
let focusables =[];
let previouslyFocusElement = null;

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector("#modal");
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusElement = document.querySelector(":focus");
    modal.style.display = null;
    focusables[0].focus();
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
    if (modal === null) return;
    if (previouslyFocusElement !== null) {
        previouslyFocusElement.focus();
    }
    e.preventDefault();
    modal.style.display = "none";
    modal2.style.display = "none";
    modal1.style.display = "flex";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.querySelector(".js-close-modal").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    
};


const stopPropagation = function (e) {
    e.stopPropagation();
};

const focusInModal = function (e){
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"));
    if (e.shiftKey === true){
        index --;
    }else{
        index ++;
    };
    if (index >= focusables.length) {
        index = 0;
    };
    if (index < 0){
        index = focusables.length -1;
    };
    focusables[index].focus();
};

document.querySelectorAll(".js-modal").forEach(link => {
    link.addEventListener("click", openModal);
});

document.querySelectorAll(".js-close-modal").forEach(button => {
    button.addEventListener("click", closeModal);
});

document.querySelectorAll(".js-modal2").forEach(button => {
    button.addEventListener("click", (event) => {
            modal1.style.display = "none";
            modal2.style.display = "flex";
    });
});

document.querySelectorAll(".js-show-vue-1").forEach(button => {
    button.addEventListener("click", () => {
        modal1.style.display = "flex";
        modal2.style.display = "none";
    })
})

window.addEventListener("click", function (event) {
    if (event.target === document.querySelector(".modal")) {
        closeModal(event);
    };
});

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    };
    if (e.key === "Tab" && modal !== null){
        focusInModal(e);
    };
});