
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
            console.log(value[i].colors[color])
          }
      }
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
