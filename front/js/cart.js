// FONCTION FETCH QUI RETOURNE LA LISTE DE PRODUIT
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for (let k = 0; k < localStorage.length; k++) { // Pour chaque produit dans le panier
      var productCart = JSON.parse(localStorage.getItem("cart"+[k])); // Récuperer le produit dans le panier
      var productObject = findProductById(value, productCart[0]); // Récuperer les informations du produit grace à l'id
      productInfoCart(value, productObject, productCart, k) // Création de l'article du produit
    }       
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

let totalPrice = 0; // Initialisation de prix

// TROUVE LES INFORMATIONS DU PRODUIT GRACE A L'ID
function findProductById(productList, productId) { 
  const productObject = productList.find(element => element._id == productId);
  return productObject;
}

// CREE L'ARTICLE DU PRODUIT
function productInfoCart(productList, productObject, productCart, index){ 
  // CREATION ARTICLE
  const $productArticle = document.createElement("article");
  $productArticle.setAttribute("class", "cart__item");
  $productArticle.setAttribute("data-id", productObject._id);
  $productArticle.setAttribute("data-color", productCart[1]);
  // CREATION DIV
  const $productDiv = document.createElement("div");
  $productDiv.setAttribute("class", "cart__item__img");
  // CREATION IMAGE
  const $productImg = document.createElement("img");
  $productImg.setAttribute("src", productObject.imageUrl);
  $productImg.setAttribute("alt", productObject.altTxt);
  // CREATION DIV
  const $productDiv2 = document.createElement("div");
  $productDiv2.setAttribute("class", "cart__item__content");
  // CREATION DIV
  const $productDiv3 = document.createElement("div");
  $productDiv3.setAttribute("class", "cart__item__content__description");
  // CREATION TITRE
  const $productTitle = document.createElement("h2");
  $productTitle.innerHTML = productObject.name;
  // CREATION PARAGRAPHE (Couleur/Prix)
  const $productColor = document.createElement("p");
  $productColor.innerHTML = productCart[1];
  const $productPrice = document.createElement("p");
  $productPrice.innerHTML = "(" + productObject.price + " € unité) " + productObject.price*productCart[2] + " €"; // Affiche le coût unitaire et total
  // CREATION DIV
  const $productDiv4 = document.createElement("div");
  $productDiv4.setAttribute("class", "cart__item__content__settings");
  // CREATION DIV 
  const $productDiv5 = document.createElement("div");
  $productDiv5.setAttribute("class", "cart__item__content__settings__quantity");
  // CREATION PARAGRAPHE 
  const $productQuantity = document.createElement("p");
  $productQuantity.innerHTML = "Qté : ";
  // CREATION INPUT (Quantité)
  const $productInput = document.createElement("input");
  $productInput.setAttribute("type", "number");
  $productInput.setAttribute("class", "itemQuantity");
  $productInput.setAttribute("name", "itemQuantity");
  $productInput.setAttribute("min", "1");
  $productInput.setAttribute("max", "100");
  $productInput.setAttribute("value", productCart[2]); // Input quantité
  // CREATION DIV 
  const $productDiv6 = document.createElement("div");
  $productDiv6.setAttribute("class", "cart__item__content__settings__delete");
  // CREATION PARAGRAPHE (Supprimer)
  const $deleteItem = document.createElement("p");
  $deleteItem.setAttribute("class", "deleteItem");
  $deleteItem.innerHTML = "Supprimer";

  // TOTAL QUANTITÉ
  const $totalQuantity = document.getElementById("totalQuantity");
  $totalQuantity.innerHTML = localStorage.length; // Affiche le nombre de produit dans le localStorage

  // TOTAL PRIX
  const $totalPrice = document.getElementById("totalPrice");
  totalPrice += productObject.price*productCart[2]; // Ajoute le prix total du produit au montant total
  $totalPrice.innerHTML = totalPrice;

  // PARENTS ENFANTS
  const $section = document.getElementById('cart__items')
  $section.appendChild($productArticle)
  $productArticle.appendChild($productDiv)
  $productDiv.appendChild($productImg)
  $productArticle.appendChild($productDiv2)
  $productDiv2.appendChild($productDiv3) 
  $productDiv3.appendChild($productTitle) 
  $productDiv3.appendChild($productColor) 
  $productDiv3.appendChild($productPrice) 
  $productDiv4.appendChild($productDiv5) 
  $productDiv2.appendChild($productDiv4) 
  $productDiv5.appendChild($productQuantity)
  $productDiv5.appendChild($productInput) 
  $productDiv4.appendChild($productDiv6) 
  $productDiv6.appendChild($deleteItem) 

  // MODIFICATION DE LA QUANTITÉ DU PRODUIT
  $productInput.addEventListener('change', function () {
    totalPrice -= productObject.price*productCart[2]; // Soustraction du prix total d'origine
    productCart[2] = parseInt(this.value); // Remplacement de la quantité du produit dans le panier
    totalPrice += productObject.price*productCart[2]; // Addition du nouveau prix total
    localStorage.setItem("cart"+[index], JSON.stringify(productCart)); // Remplacement du panier dans le localStorage
    $productPrice.innerHTML = "(" + productObject.price + " € unité) " + productObject.price*productCart[2] + " €"; // Affichage du nouveau prix
    $totalPrice.innerHTML = totalPrice;
  });

  // SUPPRESSION DU PRODUIT DANS LE PANIER
  $deleteItem.addEventListener('click', function () {
    while (index != (localStorage.length-1)) { // Boucle jusqu'au dernier produit du panier
      siblingCart = JSON.parse(localStorage.getItem("cart"+[index+1])); // Recuperation du produit suivant dans le localStorage
      localStorage.setItem(("cart"+[index]), JSON.stringify(siblingCart)); // Remplacement du produit supprimer par le suivant dans le localStorage
      let siblingId = this.closest("article").nextSibling.dataset.id; // Récuperation du data-id de l'article du produit suivant
      var siblingObject = findProductById(productList, siblingId); // Récuperation des informations du produit dans le back grace à l'id
      totalPrice -= siblingObject.price*siblingCart[2]; // Soustraction du prix du produit dans le total 
      $section.removeChild(this.closest("article").nextSibling); // Suppression du produit suivant d'origine
      productInfoCart(productList, siblingObject, siblingCart, index); // Re-création de l'article suivant avec le nouvel id 
      index++; 
    }
    totalPrice -= productObject.price*productCart[2]; // Soustraction du prix du produit dans le total 
    $totalPrice.innerHTML = totalPrice; // Actualisation du nouveau prix total
    $section.removeChild($productArticle); // Suppression de l'article sélectionné
    localStorage.removeItem("cart"+[index]); // Supression du produit superflu dans le localStorage
    $totalQuantity.innerHTML = localStorage.length; // Actualisation du nombre de produit dans le panier
  });
}

// OBJET CONTACT FORMULAIRE ET TABLEAU PRODUITS ID
const contactObject = { 
  firstName : firstName.value,
  lastName : lastName.value,
  address : address.value,
  city : city.value,
  email : email.value
}
const productIdTable = []

// MESSAGE D'ERREUR SELON L'INPUT
document.addEventListener('change', function(e) {
  if (!e.target.matches('#firstName, #lastName, #address, #city')) return; // Trouve l'id de l'input changé
  var target = e.target;
  if (isValid(target)) { // Rien n'afficher si input valide
    e.target.nextElementSibling.innerHTML = "";
  } else { // Message d'erreur affiché dans la balise suivante (ex: lastNameErrorMsg)
    e.target.nextElementSibling.innerHTML = "Erreur, caractères non autorisés";
  }});

// VÉRIFICATION DE LA VALIDITÉ DU CHAMP SÉLECTIONNÉ
function isValid(input) {
  if (input.id == "address") { // Restriction différente pour l'adresse
    return /^[A-é'èà, 0-9]+$/.test(input.value);
  }
  return /^[A-é- ]+$/.test(input.value);
}  

// VÉRIFICATION DE LA VALIDITÉ DE TOUT LES CHAMPS
function isValidAll() {
  if (isValid(firstName) && isValid(lastName) && isValid(city) && isValid(address)) {
    return true;
  }
  else {    
    return false;
  }
}

// ENVOIE LES INFORMATIONS DANS L'API
function send() {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"contact": contactObject, "products": productIdTable}) // Traduit le javascript en JSON dans le back
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(response) {
    // Redirige l'utilisateur à la page confirmation avec l'orderId dans l'URL
    document.location.href="./confirmation.html?orderId=" + response.orderId; 
  });
}

// VALIDATION DE LA COMMANDE GRACE AU BOUTON
document
  .querySelector(".cart__order__form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    if (isValidAll()) { // Si les champs sont valides
      // Initialisé les informations dans l'objet contact
      if (localStorage.length < 1) {
        alert('Aucun produit dans le panier'); // A condition qu'il y a au moins 1 objet dans le panier
      }
      else {
        contactObject.firstName = firstName.value;
        contactObject.lastName = lastName.value;
        contactObject.address = address.value;
        contactObject.city = city.value;
        contactObject.email = email.value;
        // Initialisé l'id produit de chaque article dans le tableau
        for (let i = 0; i < localStorage.length; i++) {
          productIdTable.push(JSON.parse(localStorage.getItem("cart"+[i]))[0])
        }
        // Envoie la requete POST
        send(); 
      }
    }
  });
