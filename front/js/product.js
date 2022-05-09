let params = new URLSearchParams(document.location.search);
let productId = params.get("id"); 
const $productTitle = document.querySelector('#title');
const $productPrice = document.querySelector('#price');
const $productDesc = document.querySelector('#description');
const $itemImg = document.querySelector('.item__img');
const $colorSelect = document.querySelector('#colors');



fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for (let i = 0; i < value.length; i++) {
      if (productId == value[i]._id) {
          $productTitle.innerHTML = value[i].name
          $productPrice.innerHTML = value[i].price
          $productDesc.innerHTML = value[i].description
          const $productImg = document.createElement("img");
          $productImg.setAttribute("src", value[i].imageUrl);
          $productImg.setAttribute("alt", value[i].altTxt);
          $itemImg.appendChild($productImg)
          for (let color in value[i].colors) {
            const $productColor = document.createElement("option");
            $productColor.setAttribute("value", value[i].colors[color]);
            $productColor.innerHTML = value[i].colors[color];
            $colorSelect.appendChild($productColor)
          }
          
        }
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });


for (let i = 0; i < localStorage.length; i++) {
  var cartLocal = JSON.parse(localStorage.getItem("cart"+[i]));
  console.log(cartLocal);
}


addToCart.onclick = () => {
  var colors = document.querySelector('#colors').value;
  var quantity = parseInt(document.querySelector('#quantity').value);
  var duplicate = false;
  let totalProduct = localStorage.length;

  const cart = [
    cartProductId= productId,
    cartColor= colors,
    cartQuantity= quantity
  ]

  if (colors == "" || quantity < 1 || quantity > 100 || isNaN(quantity)) {
    if (colors == "") {
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
    while (!duplicate && n < totalProduct) {
        cartLocal = JSON.parse(localStorage.getItem("cart"+[n]));
        if (productId == cartLocal[0]) {
          console.log("Canapé déjà ajouté !");
          if (colors == cartLocal[1]) {
            console.log("Canapé avec la même couleur trouvé !");
            cart[2] = quantity + cartLocal[2];
            localStorage.setItem("cart"+[n], JSON.stringify(cart));
            duplicate = true;
          }
        }
        n++;
    }
    if (duplicate == false) {
      console.log("Commande ajouté au panier");
      localStorage.setItem("cart"+[(totalProduct)], JSON.stringify(cart));
    }
  }
}