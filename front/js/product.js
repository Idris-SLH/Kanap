// Récupere l'id dans l'URL
let productId = new URLSearchParams(document.location.search).get("id");

// FONCTION FETCH QUI RETOURNE LA LISTE DE PRODUIT
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    var productFound = findProductById(value,productId); // Trouve les informations du produit grace à l'id de l'URL
    productInfo(productFound); // Retourne les information
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

// TROUVE LE PRODUIT DANS UN ELEMENT GRACE A UN ID
function findProductById(productList,productId) {
  const productObject = productList.find(element => element._id == productId);
  return productObject;
}

// INSERE LES VALEURS CONTENU DANS L'OBJET RETOURNER
function productInfo(objet){
  const $productName = document.querySelector('#title');
  const $productPrice = document.querySelector('#price');
  const $productDesc = document.querySelector('#description');
  const $item__img = document.querySelector('.item__img');
  $productName.innerHTML = objet.name
  $productPrice.innerHTML = objet.price
  $productDesc.innerHTML = objet.description
  const $productImg = document.createElement("img");
  $productImg.setAttribute("src", objet.imageUrl);
  $productImg.setAttribute("alt", objet.altTxt);
  $item__img.appendChild($productImg)
  for (let color in objet.colors) {
    const $productColor = document.createElement("option");
    $productColor.setAttribute("value", objet.colors[color]);
    $productColor.innerHTML = objet.colors[color];
    const $colorSelect = document.querySelector('#colors');
    $colorSelect.appendChild($productColor)
  }
}

// AJOUTE LE PRODUIT DANS LE PANIER
addToCart.onclick = () => {
  var color = document.querySelector('#colors').value; // Récupère la couleur
  var quantity = parseInt(document.querySelector('#quantity').value); // Récupère la quantité
  let totalProductInCart = localStorage.length;

  // Objet enregistrant le produit
  const cart = [ 
    cartProductId = productId,
    cartColor = color,
    cartQuantity = quantity
  ]

  // Vérification de la saisie 
  if (color == "" || quantity < 1 || quantity > 100 || isNaN(quantity)) {
    if (color == "") {
      alert("Couleur non renseignée");
    }
    else if (isNaN(quantity)) {
      alert("Quantité non renseigné");
    }  
    else if ( quantity < 1 || quantity > 100) {
      alert("Entrer une quantité entre 1 et 100");
    }
  }
  else {
    let n = 0;
    // Bouclé tant que n inférieur au nombre total de produit OU produit déjà dans le panier
    while (n < totalProductInCart) {
        cartLocal = JSON.parse(localStorage.getItem("cart"+[n])); 
        if (productId == cartLocal[0]) { // Chercher dans le panier le produit
          if (color == cartLocal[1]) { // Si produit trouver, vérifier la couleur
            cart[2] = quantity + cartLocal[2]; // Modifier la quantité si même couleur
            localStorage.setItem("cart"+[n], JSON.stringify(cart));
            break;
          }
        }
        n++;
    }
    if (n == totalProductInCart) { // Ajout du produit si nouveau
      localStorage.setItem("cart"+[(totalProductInCart)], JSON.stringify(cart));
    }
  }
}