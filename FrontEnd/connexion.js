const form = document.getElementById("connexion")

function verifyLogin (username, password) {
    const data = {"email": username, "password": password}
    console.log(data)

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token){
            window.location.href = "index.html"
        }else {
            alert("Erreur dans l'identifiant ou le mot de passe")
        }
    })
    .catch(error => console.error('Error:', error));
}

form.addEventListener("submit", (event) =>{
    event.preventDefault()
    const username = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(username)
    console.log(password)
    verifyLogin(username, password)
    
})
