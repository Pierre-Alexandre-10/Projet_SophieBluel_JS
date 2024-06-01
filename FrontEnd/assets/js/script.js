/**************** WORKS  *****************/

// Récupération de la class présent dans le HTML
let gallery = document.querySelector(".portfolio__gallery"); // Utiliser querySelector et non querySelectorAll

// Création de la function Json
async function dataFetch(url, param) {
    try {
        let response = await fetch(url); // Récupération obets avec la méthode fetch
        return await response.json(); // Retourne la réponse en jso
    } catch (error) {
        console.error("Error :", error);
        param.innerText = "Erreur : Impossible de récupérer les données";
        param.style.display = "flex";
        param.style.justifyContent = "center";
    }
}

// Création function affichage
async function displayWorks() {
    // Création variable pour récupérer la response.json
    let listWorks = await dataFetch("http://localhost:5678/api/works", gallery);
    // Création de la boucle pour parcourir les objets
    listWorks.forEach((works) => {
        // Création des balises sémantiques dans le DOM
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");
        // Mise en place de la hiérarchie Parent/Enfant
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        // Sélection des éléments à afficher sur la page
        img.src = works.imageUrl;
        figcaption.textContent = works.title;
    });
}
displayWorks();

async function createWorks(work) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    // Mise en place de la hiérarchie Parent/Enfant
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    // Sélection des éléments à afficher sur la page
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
}

/************** FILTRES CATEGORIES ************/

let filters = document.querySelector(".portfolio__filters");

async function displayFilters() {
    let listFilters = await dataFetch("http://localhost:5678/api/categories", filters); // Récupération response.json
    let listWorks = await dataFetch("http://localhost:5678/api/works");
    let buttonFilter = document.querySelectorAll("portfolio__filters button");
    console.log(buttonFilter);
    //-------------------
    let nav = document.createElement("nav"); // Création nav dans le DOM
    let ul = document.createElement("ul"); // Création ul dans le DOM
    filters.appendChild(nav); // Insérer la nav dans la class en tant qu'enfant
    nav.appendChild(ul); // Insérer le ul dans la nav en tant qu'enfant
    //-------------------
    let all = document.createElement("li");
    let allButton = document.createElement("button");
    allButton.setAttribute("filter__id", "0");
    allButton.textContent = "Tous";
    ul.appendChild(all);
    all.appendChild(allButton);
    //-------------------
    // Gestion du bouton TOUS
    allButton.addEventListener("click", () => {
        allButton.classList.add("active__filters");
        // allButton.classList.remove("portfolio__filters button");
        // allButton.classList.add("active__filters");
        gallery.innerHTML = "";
        displayWorks();
    });
    // Gestion des boutons de catégorie provenant de l'API
    listFilters.forEach((filtersNav) => {
        let li = document.createElement("li"); //  Création de la balise li
        let button = document.createElement("button"); //  Création de la balise button
        button.textContent = filtersNav.name; // Insérer le contenue de l'API (name)
        ul.appendChild(li); // Insérer les li dans le ul en tant qu'enfant
        li.appendChild(button); // Insérer les button dans le li en tant qu'enfant
        button.setAttribute("filter__id", filtersNav.id); // Insère Id de l'API pour chaque filter
        // Gestion des boutons au click et du syle
        button.addEventListener("click", () => {
            document
                .querySelector("portfolio__filters button")
                ?.classList.remove("portfolio__filters button");
            button.classList.add("active__filters");
            gallery.innerHTML = "";
            let filterId = button.getAttribute("filter__id");
            if (filterId !== "0") {
                let works = listWorks.filter((work) => {
                    return work.categoryId == filterId;
                });
                works.forEach((work) => {
                    createWorks(work);
                });
            }
        });
    });
}
displayFilters();

// async function testDisplayFilters() {
//     let listFilters = await dataFetch("http://localhost:5678/api/categories", filters);
//     let listWorks = await dataFetch("http://localhost:5678/api/works");
//     //--------------
//     let nav = document.createElement("nav");
//     let ul = document.createElement("ul");
//     let li = document.createElement("li");
//     let button = document.createElement("button");
//     button.innerText = "Tous";
//     //--------------
//     filters.appendChild(nav);
//     nav.appendChild(ul);
//     ul.appendChild(li);
//     li.appendChild(button);
//     //---------------
//     listFilters.filter((filtersNav) => {
//         let li = document.createElement("li");
//         let button = document.createElement("button");
//         ul.appendChild(li);
//         li.appendChild(button);
//         button.textContent = filtersNav.name;
//     });

//     console.log(button, buttonText);
// }
// testDisplayFilters();

// async function setActiveButton(param) {
//     let activeButton = null;
//     if (activeButton) {
//         activeButton.style.color = "";
//         activeButton.style.backgroundColor = "";
//     }
//     // Mettre à jour la référence au nouveau bouton actif
//     activeButton = param;
//     param.style.color = "white";
//     param.style.backgroundColor = "#1d6154";
// }
// setActiveButton();

// let activeButton = null;
// if (activeButton) {
//     activeButton.style.color = "";
//     activeButton.style.backgroundColor = "";
// }
// activeButton = allButton;
// allButton.style.color = "white";
// allButton.style.backgroundColor = "#1d6154";
