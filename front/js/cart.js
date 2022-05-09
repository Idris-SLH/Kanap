const $section = document.getElementById('cart__items')
let totalPrice = 0;
fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for (let k = 0; k < localStorage.length; k++) {
      var cartLocal = JSON.parse(localStorage.getItem("cart"+[k]));
        for (let i = 0; i < value.length; i++) {
          if (cartLocal[0] == value[i]._id) {
          // CREATION ARTICLE
          const $productArticle = document.createElement("article");
          $productArticle.setAttribute("class", "cart__item");
          $productArticle.setAttribute("data-id", value[i]._id);
          $productArticle.setAttribute("data-color", cartLocal[1]);
          // CREATION DIV
          const $productDiv = document.createElement("div");
          $productDiv.setAttribute("class", "cart__item__img");
          // CREATION IMAGE
          const $productImg = document.createElement("img");
          $productImg.setAttribute("src", value[i].imageUrl);
          $productImg.setAttribute("alt", value[i].altTxt);
          // CREATION DIV
          const $productDiv2 = document.createElement("div");
          $productDiv2.setAttribute("class", "cart__item__content");
          // CREATION DIV
          const $productDiv3 = document.createElement("div");
          $productDiv3.setAttribute("class", "cart__item__content__description");
          // CREATION TITRE
          const $productTitle = document.createElement("h2");
          $productTitle.innerHTML = value[i].name;
          // CREATION PARAGRAPHE
          const $productColor = document.createElement("p");
          $productColor.innerHTML = cartLocal[1];
          const $productPrice = document.createElement("p");
          $productPrice.innerHTML = value[i].price*cartLocal[2] + " €";
          // CREATION DIV
          const $productDiv4 = document.createElement("div");
          $productDiv4.setAttribute("class", "cart__item__content__settings");
          // CREATION DIV
          const $productDiv5 = document.createElement("div");
          $productDiv5.setAttribute("class", "cart__item__content__settings__quantity");
          // CREATION PARAGRAPHE
          const $productQuantity = document.createElement("p");
          $productQuantity.innerHTML = "Qté : " + cartLocal[2];
          // CREATION INPUT
          const $productInput = document.createElement("p");
          $productInput.setAttribute("type", "number");
          $productInput.setAttribute("class", "itemQuantity");
          $productInput.setAttribute("name", "itemQuantity");
          $productInput.setAttribute("min", "1");
          $productInput.setAttribute("max", "100");
          $productInput.setAttribute("value", cartLocal[2]);
          // CREATION DIV
          const $productDiv6 = document.createElement("div");
          $productDiv6.setAttribute("class", "cart__item__content__settings__delete");
          // CREATION PARAGRAPHE
          const $deleteItem = document.createElement("p");
          $deleteItem.setAttribute("class", "deleteItem");
          $deleteItem.innerHTML = "Supprimer";
    

          // TOTAL QUANTITÉ
          const $totalQuantity = document.getElementById("totalQuantity");
          $totalQuantity.innerHTML = localStorage.length;
          // TOTAL PRIX
          const $totalPrice = document.getElementById("totalPrice");
          totalPrice += value[i].price*cartLocal[2];
          $totalPrice.innerHTML = totalPrice;
          console.log(totalPrice);

          // PARENTS ENFANTS
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
        }
      }
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });





// MESSAGE ERREUR
const $firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const $lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const $addressErrorMsg = document.getElementById("addressErrorMsg");
const $cityErrorMsg = document.getElementById("cityErrorMsg");
const $emailErrorMsg = document.getElementById("emailErrorMsg");
$firstNameErrorMsg.innerHTML = "Ceci est un message d'erreur";
$lastNameErrorMsg.innerHTML = "Ceci est un message d'erreur";
$addressErrorMsg.innerHTML = "Ceci est un message d'erreur";
$cityErrorMsg.innerHTML = "Ceci est un message d'erreur";
$emailErrorMsg.innerHTML = "Ceci est un message d'erreur";