const $orderId = document.getElementById("orderId");
let orderId = new URLSearchParams(document.location.search).get("orderId");
$orderId.textContent = orderId;