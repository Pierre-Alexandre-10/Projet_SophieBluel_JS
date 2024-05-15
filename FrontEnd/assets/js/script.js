// Récupération de la class présent dans le HTML
const gallery = document.querySelector(".gallery"); // Utiliser querySelector et non querySelectorAll

// Création de la function Json
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works"); // Récupération obets avec la méthode fetch
    // const responseJson = await response.json(); // Convertit la réponse en json
    // console.log(responseJson);  // Contrôle le retour des objet dans la console
    return await response.json(); // Retourne la réponse en json
}
getWorks();

// Création function affichage
async function displayWorks() {
    // Création variable pour récupérer la response.json
    const listWorks = await getWorks();
    // Création de la boucle pour parcourir les objets
    listWorks.forEach((works) => {
        // Création des balises sémantiques dans le DOM
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
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
