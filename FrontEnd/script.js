//Récupération des données de l'API
const response = await fetch("http://localhost:5678/api/works")
console.log(response)
const works = await response.json()
console.log(works)

const respbis = await fetch("http://localhost:5678/api/categories/")
console.log(respbis)
const categories = await respbis.json()
console.log(categories) 

//Fonction qui va générer les travaux
function generWorks(works){

    for (let i = 0; i < works.length; i++){
        const figure = works[i]
        console.log(figure)
        //Récupération de l'élément du DOM qui va accueillir les travaux de l'architecte
        const divGallery = document.querySelector(".gallery")
        //Création d'une balise dédiée à un des travaux
        const worksElement = document.createElement("figure")
        
        const imageElement = document.createElement("img")
        imageElement.src = figure.imageUrl
        
        const titleElement = document.createElement("figcaption")
        titleElement.innerText = figure.title
        //On rattache la balise figure à la div .gallery
        divGallery.appendChild(worksElement)
        //On rattache l'image et le titre a la balise figure
        worksElement.appendChild(imageElement)
        worksElement.appendChild(titleElement)
        
        console.log(worksElement)
        console.log(imageElement)
        console.log(titleElement)
        
        const categoryId = figure.category
        console.log(categoryId)
        
    }
}

generWorks(works)

//Récupération de l'élément du DOM qui va accueillir les filtres
const filters = document.querySelector(".filter")
//Création de balises dédiées aux filtres
const filterI = document.createElement("input")
filterI.setAttribute("type", "button")
filterI.setAttribute("value", "Tous")
//On rattache la balise input à la div .filter
filters.appendChild(filterI)
console.log(filterI)

filterI.addEventListener("click", () => {
    document.querySelector(".gallery").innerHTML = ""
    generWorks(works)
})

for ( let i = 0; i<categories.length; i++){
    const input = categories[i]
    console.log(input)
    
    const filterI = document.createElement("input")
    filterI.setAttribute("type", "button")
    filterI.setAttribute("value",input.name)
    filters.appendChild(filterI)
    console.log(filterI)
    
    const id = input.id
    console.log(id)
    
    filterI.addEventListener("click", () => {
        console.log("click")
        const filterCategory = works.filter(function(work){
            return work.categoryId === id
        })
        console.log(filterCategory)
        document.querySelector(".gallery").innerHTML = ""
        generWorks(filterCategory)

    })
    
}

