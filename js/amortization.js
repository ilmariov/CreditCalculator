const int = (i, type) => {
    return (type === 'em') ? i/100
            : (type === 'ea') ? ((1 + (i/100)) ** (1/12)) - 1
            : i / 1200;
}

const fee = (p, n, iR) => {return p * (iR * ((1 + iR) ** n)) / (((1 + iR) ** n) - 1)};

const getData = () => {
    const amount = document.getElementById("amount").value;
    const n = document.getElementById("term").value;
    const period = document.getElementById("term-period").value;
    const i = document.getElementById("rate").value;
    const type = document.getElementById("int-type").value;

    const term = paymentPeriod(n, period);
    const iRate = int(i, type);
    const toPay = fee(amount, term, iRate);

    return{initBalance: amount, int: iRate, fee: toPay}
}

const amtzTable = () => {
    const initBalanceArr = [];
    const interestArr = [];
    const principalArr = [];
    const endBalanceArr = [];

    const data = getData();
    let initBalance = Number(data.initBalance);
    let int = data.int;
    let toPay = data.fee;
    let endBalance;
    do {
        initBalanceArr.push(initBalance);
        let interest = initBalance * int;
        interestArr.push(interest);
        let principal = toPay - interest;
        principalArr.push(principal);
        endBalance = initBalance - principal;
        if (initBalance < toPay) {
            endBalance = 0;
        }
        endBalanceArr.push(endBalance);
        initBalance = endBalance;
    } while (endBalance > 0);
    console.log(endBalanceArr);
}

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        amortizationApp();
    }
})

const amortizationApp = () => {
    const amortzLink = document.getElementById("amtz-link");
    amortzLink.addEventListener("click", (event) => {
        amtzTable();
    })
}