// Récuperation de la balise orderId
const $orderId = document.getElementById("orderId");
// Récuperation de l'Id dans l'URL
let orderId = new URLSearchParams(document.location.search).get("orderId");
// Insertion de l'orderId dans la balise HTML
$orderId.textContent = orderId;