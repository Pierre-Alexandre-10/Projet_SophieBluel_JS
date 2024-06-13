/**************** WORKS  *****************/

// Récupération de la class présent dans le HTML
let gallery = document.querySelector(".portfolio__gallery"); // Utiliser querySelector et non querySelectorAll

// Création de la function Json
async function dataFetch(url, param) {
    try {
        let response = await fetch(url); // Récupération obets avec la méthode fetch
        return await response.json(); // Retourne la réponse en json
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

async function createWorks(param) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    // Mise en place de la hiérarchie Parent/Enfant
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    // Sélection des éléments à afficher sur la page
    img.src = param.imageUrl;
    figcaption.textContent = param.title;
}

/************** FILTRES CATEGORIES ************/

let filters = document.querySelector(".portfolio__filters");

async function displayFilters() {
    let listFilters = await dataFetch("http://localhost:5678/api/categories", filters); // Récupération response.json
    let listWorks = await dataFetch("http://localhost:5678/api/works");
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
    allButton.addEventListener("click", (e) => {
        buttonStyle(e);
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
        button.addEventListener("click", (e) => {
            buttonStyle(e);
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

async function buttonStyle(e) {
    let targetButton = e.target;
    document.querySelector(".active__filters")?.classList.remove("active__filters"); // (? : Opérateur optionnel)
    targetButton.classList.add("active__filters");
}

/*********************** USER CONNECTED **************************/

async function indexStyleLogin() {
    let userLogged = window.sessionStorage.userLogged;
    let body = document.querySelector("body");
    let loginTxt = document.querySelector(".login");
    let filters = document.querySelector(".portfolio__filters");
    let gallery = document.querySelector(".portfolio__gallery");
    let portfolio = document.querySelector("#portfolio");
    let title = document.querySelector("#portfolio h2");

    if (userLogged === "true") {
        let section = document.createElement("section");
        body.prepend(section);
        section.classList.add("edit__mode__style");
        /*---------------------------------------*/
        let i = document.createElement("i");
        i.classList.add("fa-regular", "fa-pen-to-square");
        section.appendChild(i);
        /*---------------------------------------*/
        let p = document.createElement("p");
        p.innerHTML = "&nbsp;Mode édition";
        section.appendChild(p);
        /*---------------------------------------*/
        loginTxt.textContent = "logout";
        filters.style.display = "none";
        gallery.style.marginTop = "92px";
        title.style.width = "60%";
        title.style.textAlign = "end";
        /*---------------------------------------*/
        let div = document.createElement("div");
        portfolio.insertBefore(div, portfolio.firstChild);
        div.appendChild(title);
        /*---------------------------------------*/
        let modify = document.createElement("i");
        modify.classList.add("fa-regular", "fa-pen-to-square");
        modify.classList.add("modify");
        div.appendChild(modify);
        div.classList.add("portfolio__title");
        /*---------------------------------------*/
        let modifyButton = document.createElement("button");
        div.appendChild(modifyButton);
        modifyButton.textContent = "modifier";
        modifyButton.classList.add("modifyButton");
        modifyTxtGlobal = modifyButton;
        /*---------------------------------------*/

        loginTxt.addEventListener("click", () => {
            window.sessionStorage.userLogged = "false";
            window.sessionStorage.token = "";
            window.sessionStorage.userId = "";
        });
    }
}
indexStyleLogin();

/*************************** MODALE *********************/

async function displayModal() {
    let body = document.querySelector("body");

    let section = document.createElement("section");
    section.classList.add("modal__section");
    body.appendChild(section);
    /*----------------------------------*/
    let div = document.createElement("div");
    div.classList.add("modal__window");
    section.appendChild(div);
    /*----------------------------------*/
    let span = document.createElement("span");
    div.appendChild(span);
    /*----------------------------------*/
    let i = document.createElement("i");
    i.classList.add("fa-solid", "fa-xmark");
    span.appendChild(i);
    /*----------------------------------*/
    let p = document.createElement("p");
    p.classList.add("gallery__txt");
    p.innerText = "Galerie photo";
    div.appendChild(p);
    /*----------------------------------*/
    let modal = document.createElement("div");
    modal.classList.add("modal__block");
    div.appendChild(modal);
    /*----------------------------------*/
    let button = document.createElement("button");
    button.textContent = "Ajouter une photo";
    button.classList.add("button__modal");
    div.appendChild(button);
    /*----------------------------------*/
    modifyTxtGlobal.addEventListener("click", () => {
        section.style.display = "flex";
        i.addEventListener("click", () => {
            section.style.display = "none";
        });
    });

    section.addEventListener("click", (e) => {
        if (e.target.className == "modal__section") {
            section.style.display = "none";
        }
    });
}
displayModal();

async function displayWorksModal() {
    let modal = document.querySelector(".modal__block");
    modal.innerHTML = "";
    let works = await dataFetch("http://localhost:5678/api/works");
    works.forEach((work) => {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let span = document.createElement("span");
        span.classList.add("trashcan__font");
        let trashFont = document.createElement("i");
        trashFont.classList.add("fa-solid", "fa-trash-can");
        modal.appendChild(figure);
        figure.appendChild(span);
        figure.appendChild(img);
        span.appendChild(trashFont);
        trashFont.id = work.id;
        img.src = work.imageUrl;
    });
}
displayWorksModal();

async function addModalWork() {
    let addButton = document.querySelector(".button__modal");
    let modalAdd = document.querySelector(".modal__section__add");
    let modal = document.querySelector(".modal__section");
    let arrowLeft = document.querySelector(".fa-arrow-left");
    let xmark = document.querySelector(".modal__section__add__font .fa-xmark");

    addButton.addEventListener("click", () => {
        modal.style.display = "none";
        modalAdd.style.display = "flex";
    });

    arrowLeft.addEventListener("click", () => {
        modal.style.display = "flex";
        modalAdd.style.display = "none";
    });

    xmark.addEventListener("click", () => {
        modalAdd.style.display = "none";
    });

    modalAdd.addEventListener("click", (e) => {
        if (e.target.className == "modal__section__add") {
            modalAdd.style.display = "none";
        }
    });
}
addModalWork();

async function previewImg() {
    let previewImg = document.querySelector(".modal__section__add__form__preview img");
    let inputFile = document.querySelector(".modal__section__add__form__preview input");
    let labelFile = document.querySelector(".modal__section__add__form__preview label");
    let i = document.querySelector(".modal__section__add__form__preview .fa-image");
    let p = document.querySelector(".modal__section__add__form__preview p");

    inputFile.addEventListener("change", () => {
        let file = inputFile.files[0];
        console.log(file);
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                previewImg.style.display = "flex";
                labelFile.style.display = "none";
                i.style.display = "none";
                p.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    });
}
previewImg();

async function getCategoryModal() {
    let select = document.querySelector(".modal__section__add__form #category");
    let categorys = await dataFetch("http://localhost:5678/api/categories");
    categorys.forEach((category) => {
        let option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}
getCategoryModal();

function postMethodImg() {
    let form = document.querySelector(".modal__section__add__form");
    let authToken = window.sessionStorage.token;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(form);
        let data = Object.fromEntries(formData);

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                displayWorksModal();
                displayWorks();
            })
            .catch((error) => console.log(error));
    });
}
postMethodImg();
