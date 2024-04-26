const response = await fetch("http://localhost:5678/api/works")
console.log(response)
const works = await response.json()
console.log(works)

for (let i = 0; i < works.length; i++){
    const figure = works[i]
    console.log(figure)

    const divGallery = document.querySelector(".gallery")

    const worksElement = document.createElement("figure")

    const imageElement = document.createElement("img")
    imageElement.src = figure.imageUrl

    const titleElement = document.createElement("figcaption")
    titleElement.innerText = figure.title

    divGallery.appendChild(worksElement)
    worksElement.appendChild(imageElement)
    worksElement.appendChild(titleElement)

    console.log(worksElement)
    console.log(imageElement)
    console.log(titleElement)
}