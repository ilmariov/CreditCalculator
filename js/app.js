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

function editNum(num) {
    if (1000 <= num & num < 1000000) {
        let decimals1 = num.toString().split('.')[1];
        const num2a = Number(num.toString().split('.')[0]) / 1000;
        const thousands1 = num2a.toFixed(3).toString().split('.')[1];
        return Math.trunc(num2a).toString() + ',' + thousands1 + '.' + decimals1;
    } else if (1000000 <= num & num < 1000000000) {
        let decimals2 = num.toString().split('.')[1];
        const num2b = Number(num.toString().split('.')[0]) / 1000;
        const thousands2 = num2b.toFixed(3).toString().split('.')[1];
        const num3a = Number(num2b.toFixed(3).toString().split('.')[0]) / 1000;
        const milliar1 = num3a.toFixed(3).toString().split('.')[1];
        return Math.trunc(num3a).toString() + ',' + milliar1 + ',' + thousands2 + '.' + decimals2;
    } else if (1000000000 <= num & num < 1000000000000) {
        let decimals3 = num.toString().split('.')[1];
        const num2c = Number(num.toString().split('.')[0]) / 1000;
        const thousands3 = num2c.toFixed(3).toString().split('.')[1];
        const num3b = Number(num2c.toFixed(3).toString().split('.')[0]) / 1000;
        const milliar2 = num3b.toFixed(3).toString().split('.')[1];
        const num4 = Number(num3b.toFixed(3).toString().split('.')[0]) / 1000;
        const milliard = num4.toFixed(3).toString().split('.')[1];
        return Math.trunc(num4).toString() + ',' + milliard + ',' + milliar2 + ',' + thousands3 + '.' + decimals3;
    } else {
        return num;
    }
}

const initApp = () => {
    const calcForm = document.getElementById("calcForm");
    calcForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const value = getValues();
        const term = paymentPeriod(value.n, value.period);
        const iRate = interest(value.i, value.type);
        const toPay = monthlyPay(value.principal, term, iRate);
        
        const div = document.getElementById("fee");
        const language = document.querySelector('#btn').textContent;
        if (language.includes('Calculate')) {
            div.innerHTML = "<h3>Monthly payment = $ " + editNum(toPay.toFixed(2)) + "</h3>";
        } else {
            div.innerHTML = "<h3>Cuota mensual = $ " + editNum(toPay.toFixed(2)) + "</h3>";
        }
        
    })
}

function resetForm() {
    document.getElementById('calcForm').reset();
}