// fetch("http://localhost:5678/api/users/login",{
//     method : "POST",
//     headers : "Content-Type: application/json",

// })
//Récupération des élément du DOM qui accueillent le formulaire de connexion
const form = document.getElementById("connexion")
const baliseEmail = document.getElementById("email")
const balisePassword = document.getElementById("password")
console.log(form)

//Fonction qui vérifie les identifiants de connexion
function verifyLogin(email, password) {
    if (email === "test@test.fr" && password === "1234"){
        //Redirige vers la page d'accueil si les identifiants sont corrects
        window.location.href = "index.html"
    }else{
        //Affiche un message d'erreur si la combinaison utilisateur/mdp est fausse
        alert("Erreur de connexion")
    }
}

//Récupère la valeur entrée pqr l'utilisateur et appelle la fonction verifyLogin à l'envoi du formulaire
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const email = baliseEmail.value
    const password = balisePassword.value
    verifyLogin(email, password)
})