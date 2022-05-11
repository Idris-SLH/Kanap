let productId = new URLSearchParams(document.location.search).get("id");

fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    var productFound = findProductById(value,productId);
    productInfo(productFound);

  })
  .catch(function(err) {
    // Une erreur est survenue
  });

function findProductById(productList,productId) {
  const productObject = productList.find(element => element._id == productId);
  return productObject;
}

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

addToCart.onclick = () => {
  var color = document.querySelector('#colors').value;
  var quantity = parseInt(document.querySelector('#quantity').value);
  var duplicate = false;
  let totalProductInCart = localStorage.length;

  const cart = [
    cartProductId = productId,
    cartColor = color,
    cartQuantity = quantity
  ]

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
    while (!duplicate && n < totalProductInCart) {
        cartLocal = JSON.parse(localStorage.getItem("cart"+[n]));
        if (productId == cartLocal[0]) {
          if (color == cartLocal[1]) {
            cart[2] = quantity + cartLocal[2];
            localStorage.setItem("cart"+[n], JSON.stringify(cart));
            duplicate = true;
          }
        }
        n++;
    }
    if (duplicate == false) {
      localStorage.setItem("cart"+[(totalProductInCart)], JSON.stringify(cart));
    }
  }
}