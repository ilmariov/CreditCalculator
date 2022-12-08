const monthlyPay = (p, i, n) => {return p * (i * ((1 + i) ** n)) / (((1 + i) ** n) - 1)};

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        initApp();
    }
})

const initApp = () => {
    const calcForm = document.getElementById("calcForm");
    calcForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const amount = document.getElementById("amount").value;
        const months = document.getElementById("term").value;
        const iRate = document.getElementById("rate").value / 100;
        const toPay = monthlyPay(amount, iRate, months);
        const div = document.getElementById("fee");
        console.log(toPay);
        div.innerHTML = "<h3>Monthly payment = " + Math.trunc(toPay) + "</h3>";
    })
}

