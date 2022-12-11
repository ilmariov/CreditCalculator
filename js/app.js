const paymentPeriod = (n, period) => (period === 'months') ? n : n * 12;

const interest = (i, type) => {
    return (type === 'em') ? i/100
            : (type === 'ea') ? ((1 + (i/100)) ** (1/12)) - 1
            : i / 1200;
}   

const monthlyPay = (p, n, iR) => {return p * (iR * ((1 + iR) ** n)) / (((1 + iR) ** n) - 1)};

const getValues = () => {
    const p = document.getElementById("amount").value;
    const n = document.getElementById("term").value;
    const period = document.getElementById("term-period").value;
    const i = document.getElementById("rate").value;
    const type = document.getElementById("int-type").value;
    return {principal: p, n: n, period: period, i: i, type: type}
}

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

        const value = getValues();
        const term = paymentPeriod(value.n, value.period);
        const iRate = interest(value.i, value.type);
        const toPay = monthlyPay(value.principal, term, iRate);
        
        const div = document.getElementById("fee");
        div.innerHTML = "<h3>Monthly payment = " + Math.trunc(toPay) + "</h3>";
    })
}