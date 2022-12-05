const amount = document.getElementById("amount").value;
const fee = document.getElementById("fee");
console.log(amount);
fee.style.color = "#ffcc00";
fee.innerHTML = "<h3>Here goes the outcome: " + amount + "</h3>"; 