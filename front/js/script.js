const $section = document.getElementById('items')


fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
        for (let i = 0; i < value.length; i++) {
            // CREATION LIEN
            const $productLink = document.createElement("a");
            $productLink.setAttribute("href","./product.html?id=" + value[i]._id);
            // CREATION ARTICLE
            const $productArticle = document.createElement("article");
            // CREATION IMAGE
            const $productImg = document.createElement("img");
            $productImg.setAttribute("src", value[i].imageUrl);
            $productImg.setAttribute("alt", value[i].altTxt);
            // CREATION TITRE
            const $productTitle = document.createElement("h3");
            $productTitle.setAttribute("class","productName");
            $productTitle.innerHTML = value[i].name
            // CREATION PARAGRAPHE
            const $productDesc = document.createElement("p");
            $productDesc.setAttribute("class","productDescription");
            $productDesc.innerHTML = value[i].description
            // PARENTS ENFANTS
            $section.appendChild($productLink)
            $productLink.appendChild($productArticle)
            $productArticle.appendChild($productImg)
            $productArticle.appendChild($productTitle)
            $productArticle.appendChild($productDesc)    
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

