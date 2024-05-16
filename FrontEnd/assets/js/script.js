/**************** WORKS  *****************/

// Récupération de la class présent dans le HTML
let gallery = document.querySelector(".portfolio__gallery"); // Utiliser querySelector et non querySelectorAll

// Création de la function Json
async function getWorks() {
    let response = await fetch("http://localhost:5678/api/works"); // Récupération obets avec la méthode fetch
    // const responseJson = await response.json(); // Convertit la réponse en json
    // console.log(responseJson);  // Contrôle le retour des objet dans la console
    return await response.json(); // Retourne la réponse en json
}
getWorks();

// Création function affichage
async function displayWorks() {
    // Création variable pour récupérer la response.json
    let listWorks = await getWorks();
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

//Appel de la fonction
displayWorks();

/************** FILTRES CATEGORIES ************/

let filters = document.querySelector(".portfolio__filters");
let all = "Tous";

async function getFilters() {
    let response = await fetch("http://localhost:5678/api/categories");
    // let responseJson = await response.json();
    // console.log(responseJson);
    return await response.json();
}

async function displayFilters() {
    let listFilters = await getFilters(); // Récupération response.json
    let nav = document.createElement("nav"); // Création nav dans le DOM
    let ul = document.createElement("ul"); // Création ul dans le DOM
    filters.appendChild(nav); // Insérer la nav dans la class en tant qu'enfant
    nav.appendChild(ul); // Insérer le ul dans la nav en tant qu'enfant
    let all = document.createElement("li");
    all.textContent = "Tous";
    ul.appendChild(all);
    // Boucle des noms de catégories
    listFilters.forEach((filtersNav) => {
        let li = document.createElement("li"); //  Création de la balise li
        li.textContent = filtersNav.name; // Insérer le contenue de l'API (name)
        ul.appendChild(li); // Insérer les li dans le ul en tant qu'enfant
    });
}

// async function displayFilters() {
//     let listFilters = await getFilters();
//     listFilters.forEach((filtersNav) => {
//         let nav = document.createElement("nav");
//         let ul = document.createElement("ul");
//         let li = document.createElement("li");
//         filters.appendChild(nav);
//         nav.appendChild(ul);
//         ul.appendChild(li);
//         li.textContent = filtersNav.name;
//     });
// }

// Appel des function
getFilters();
displayFilters();
