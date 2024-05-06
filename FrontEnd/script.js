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
function generWorks(works) {
    works.forEach((figure) => {
        console.log(figure)
        // Récupération de l'élément du DOM qui va accueillir les travaux de l'architecte
        const divGallery = document.querySelector(".gallery")
        // Création d'une balise dédiée à un des travaux
        const worksElement = document.createElement("figure")

        const imageElement = document.createElement("img")
        imageElement.src = figure.imageUrl

        const titleElement = document.createElement("figcaption")
        titleElement.innerText = figure.title
        // On rattache la balise figure à la div .gallery
        divGallery.appendChild(worksElement)
        // On rattache l'image et le titre à la balise figure
        worksElement.appendChild(imageElement)
        worksElement.appendChild(titleElement)

        console.log(worksElement)
        console.log(imageElement)
        console.log(titleElement)

        const categoryId = figure.category
        console.log(categoryId)
    })
}

generWorks(works)

function createFilterButton(value, isAll) {
    const filterI = document.createElement("input")
    filterI.setAttribute("type", "button")
    filterI.setAttribute("value", value)
    filterI.classList.add("noClick")

    if (isAll) {
        filterI.addEventListener("click", () => {
            document.querySelector(".gallery").innerHTML = ""
            generWorks(works)
            filterClass(filterI)
        })
    } else {
        const id = categories.find((cat) => cat.name === value).id
        filterI.addEventListener("click", () => {
            const filterCategory = works.filter((work) => work.categoryId === id)
            document.querySelector(".gallery").innerHTML = ""
            generWorks(filterCategory)
            filterClass(filterI)
        })
    }

    return filterI
}

function filterClass(filterElement) {
    const allFilters = document.querySelectorAll(".filter input")
    allFilters.forEach((filter) => {
        filter.classList.remove("click")
        filter.classList.add("noClick")
    })

    filterElement.classList.remove("noClick")
    filterElement.classList.add("click")
}

function createFilters(categories) {
    const filters = document.querySelector(".filter")
    const filterAll = createFilterButton("Tous", true)
    filters.appendChild(filterAll)

    categories.forEach((input) => {
        const filter = createFilterButton(input.name, false)
        filters.appendChild(filter)
    })
}

function filters(categories) {
    createFilters(categories)
}

filters(categories)
