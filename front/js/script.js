fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
        for (let i = 0; i < value.length; i++) {
          productListHome(value,i);
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

function productListHome(productList, index){
  const $section = document.getElementById('items') 
  // CREATION LIEN
  const $productLink = document.createElement("a");
  $productLink.setAttribute("href","./product.html?id=" + productList[index]._id);
  // CREATION ARTICLE
  const $productArticle = document.createElement("article");
  // CREATION IMAGE
  const $productImg = document.createElement("img");
  $productImg.setAttribute("src", productList[index].imageUrl);
  $productImg.setAttribute("alt", productList[index].altTxt);
  // CREATION TITRE
  const $productTitle = document.createElement("h3");
  $productTitle.setAttribute("class","productName");
  $productTitle.innerHTML = productList[index].name
  // CREATION PARAGRAPHE
  const $productDesc = document.createElement("p");
  $productDesc.setAttribute("class","productDescription");
  $productDesc.innerHTML = productList[index].description
  // PARENTS ENFANTS
  $section.appendChild($productLink)
  $productLink.appendChild($productArticle)
  $productArticle.appendChild($productImg)
  $productArticle.appendChild($productTitle)
  $productArticle.appendChild($productDesc)   
}