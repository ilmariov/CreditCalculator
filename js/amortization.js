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

const amtzData = () => {
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
    return {init: initBalanceArr, i: interestArr, p: principalArr, end: endBalanceArr}
}

const amtzTable = () => {
    const tableDiv = document.getElementById('table-div');
    const thead_string = `
        <table class="table table-warning table-hover">
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Initial Balance</th>
                    <th>Interest</th>
                    <th>Principal</th>
                    <th>End Balance</th>
                </tr>
            </thead>
            <tbody>
    `;
    const tbody_str = tableDataString();
    tableDiv.innerHTML = thead_string + tbody_str;
}

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
        const num3 = Number(num2b.toFixed(3).toString().split('.')[0]) / 1000;
        const milliar = num3.toFixed(3).toString().split('.')[1];
        return Math.trunc(num3).toString() + ',' + milliar + ',' + thousands2 + '.' + decimals2;
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

function tableDataString() {
    const data_table = amtzData();
    let tbody_string = '';
    for (let i=0; i<data_table.i.length; i++){
        let tr_string = `
            <tr>
                <td>`+ (i+1) +`</td>
                <td>`+ editNum(data_table.init[i].toFixed(2)) +`</td>
                <td>`+ editNum(data_table.i[i].toFixed(2)) +`</td>
                <td>`+ editNum(data_table.p[i].toFixed(2)) +`</td>
                <td>`+ editNum(data_table.end[i].toFixed(2)) +`</td>
            </tr>
        `;
        tbody_string = tbody_string + tr_string;
    }
    const full_tbody_str = tbody_string + '</tbody></table>';
    return full_tbody_str;
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