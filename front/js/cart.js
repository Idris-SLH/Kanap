fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for (let k = 0; k < localStorage.length; k++) {
      var productCart = JSON.parse(localStorage.getItem("cart"+[k]));
      var productObject = findProductById(value, productCart[0]);
      productInfoCart(value, productObject, productCart, k)
    }       
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

let totalPrice = 0;

function findProductById(productList, productId) {
  const productObject = productList.find(element => element._id == productId);
  return productObject;
}

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
  // CREATION PARAGRAPHE
  const $productColor = document.createElement("p");
  $productColor.innerHTML = productCart[1];
  const $productPrice = document.createElement("p");
  $productPrice.innerHTML = "(" + productObject.price + " € unité) " + productObject.price*productCart[2] + " €";
  // CREATION DIV
  const $productDiv4 = document.createElement("div");
  $productDiv4.setAttribute("class", "cart__item__content__settings");
  // CREATION DIV
  const $productDiv5 = document.createElement("div");
  $productDiv5.setAttribute("class", "cart__item__content__settings__quantity");
  // CREATION PARAGRAPHE
  const $productQuantity = document.createElement("p");
  $productQuantity.innerHTML = "Qté : ";
  // CREATION INPUT
  const $productInput = document.createElement("input");
  $productInput.setAttribute("type", "number");
  $productInput.setAttribute("class", "itemQuantity");
  $productInput.setAttribute("name", "itemQuantity");
  $productInput.setAttribute("min", "1");
  $productInput.setAttribute("max", "100");
  $productInput.setAttribute("value", productCart[2]);
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
  totalPrice += productObject.price*productCart[2];
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

  $productInput.addEventListener('change', function () {
    totalPrice -= productObject.price*productCart[2];
    productCart[2] = parseInt(this.value);
    totalPrice += productObject.price*productCart[2];
    localStorage.setItem("cart"+[index], JSON.stringify(productCart));
    $productPrice.innerHTML = "(" + productObject.price + " € unité) " + productObject.price*productCart[2] + " €";
    $totalPrice.innerHTML = totalPrice;
  });

  $deleteItem.addEventListener('click', function () {
    while (index != (localStorage.length-1)) {
      siblingCart = JSON.parse(localStorage.getItem("cart"+[index+1]));
      localStorage.setItem(("cart"+[index]), JSON.stringify(siblingCart));
      let siblingId = this.closest("article").nextSibling.dataset.id;
      var siblingObject = findProductById(productList, siblingId);
      totalPrice -= siblingObject.price*siblingCart[2];
      productInfoCart(productList, siblingObject, siblingCart, index);
      $section.removeChild(this.closest("article").nextSibling);
      index++; 
    }
    totalPrice -= productObject.price*productCart[2];
    $totalPrice.innerHTML = totalPrice;
    $section.removeChild($productArticle);
    localStorage.removeItem("cart"+[index]);
    $totalQuantity.innerHTML = localStorage.length;
  });
}

// CONTACT
const contactObject = {
  firstName : firstName.value,
  lastName : lastName.value,
  address : address.value,
  city : city.value,
  email : email.value
}

const productIdTable = []

document.addEventListener('change', function(e) {
  if (!e.target.matches('#firstName, #lastName, #address, #city')) return;
  var target = e.target;
  if (isValid(target)) {
    e.target.nextElementSibling.innerHTML = "";
  } else {
    e.target.nextElementSibling.innerHTML = "Ceci est un message d'erreur";
  }});


function isValid(input) {
  if (input.id == "address") {
    return /^[A-é'èà, 0-9]+$/.test(input.value);
  }
  return /^[A-é- ]+$/.test(input.value);
}  



// SUBMIT
document
  .querySelector(".cart__order__form")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    if (isValidAll()) {
      contactObject.firstName = firstName.value;
      contactObject.lastName = lastName.value;
      contactObject.address = address.value;
      contactObject.city = city.value;
      contactObject.email = email.value;
      for (let i = 0; i < localStorage.length; i++) {
        productIdTable.push(JSON.parse(localStorage.getItem("cart"+[i]))[0])
      }
      send(); 
    }
  });

function isValidAll() {
  if (isValid(firstName) && isValid(lastName) && isValid(city) && isValid(address)) {
    return true;
  }
  else {    
    return false;
  }
}

function send() {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"contact": contactObject, "products": productIdTable})
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(response) {
    document.location.href="./confirmation.html?orderId=" + response.orderId; 
  });
}
