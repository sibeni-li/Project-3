//Récupération des données de l'API
const response = await fetch("http://localhost:5678/api/works")
console.log(response)
const works = await response.json()
console.log(works)

function generWorks(){

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
    }
}

generWorks()

