let form = document.querySelector(".form");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let errorMessage = document.querySelector(".form__login__errortxt");
let loginPage = document.querySelector(".login__page");

async function login() {
    loginPage.classList.add(".login__page");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Récupérer toutes les informations du formulaires
        let formData = new FormData(form);

        // Convertir les informatrions en objet
        let data = Object.fromEntries(formData);

        // Envoie des informations grâce au fetch
        fetch("http://localhost:5678/api/users/login", {
            // Méthode POST : une requête pour envoyerdes données
            // Headers : Préciser que le contenue sera du JSON (JavaScript Object Notation)
            // Body : Convertir les données reçu en JSON
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.status == "401" || response.status == "404") {
                    errorMessage.textContent = "Email et/ou Mot de passe incorrect";
                    email.classList.add("input__error");
                    password.classList.add("input__error");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data.token && data.userId) {
                    window.sessionStorage.token = data.token;
                    window.sessionStorage.userId = data.userId;
                    window.sessionStorage.userLogged = true;
                    window.location.href = "./index.html";
                }
            })
            .catch((error) => console.log(error));
    });
}
login();
