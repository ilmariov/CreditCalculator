document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        amortizationApp();
    }
})

const amortizationApp = () => {
    const amortzLink = document.getElementById("amtz-link");
    amortzLink.addEventListener("click", (event) => {
        displayTable();
    })
}

const displayTable = () => {
    const tableDiv = document.getElementById('table-div');
    const table_init_tags = `
        <table class="table table-warning table-hover">
            <thead>
                <tr>`;
    const thead_E_string = `
                    <th>Month</th>
                    <th>Initial Balance</th>
                    <th>Interest</th>
                    <th>Principal</th>
                    <th>End Balance</th>`;
    const thead_S_string = `
                    <th>Mes</th>
                    <th>Balance Inicial</th>
                    <th>Interéses</th>
                    <th>Abono a capital</th>
                    <th>Balance final</th>`;
    const thead_end_tags = `
                </tr>
            </thead>
            <tbody>`;
    const tbody_str = tableDataString();
    const language = document.querySelector('#amtz-link').textContent;
    if (language.includes('to')) {
        tableDiv.innerHTML = table_init_tags + thead_E_string + thead_end_tags + tbody_str;
    } else {
        tableDiv.innerHTML = table_init_tags + thead_S_string + thead_end_tags + tbody_str;
    }    
}

function tableDataString() {
    const data_table = amortizationData();
    let tbody_string = '';
    for (let i=0; i<data_table.i.length; i++){
        let tr_string = `
            <tr>
                <td>`+ (i+1) +`</td>
                <td>`+ numEdition(data_table.init[i]) +`</td>
                <td>`+ numEdition(data_table.i[i]) +`</td>
                <td>`+ numEdition(data_table.p[i]) +`</td>
                <td>`+ numEdition(data_table.end[i]) +`</td>
            </tr>
        `;
        tbody_string = tbody_string + tr_string;
    }
    const full_tbody_str = tbody_string + '</tbody></table>';
    return full_tbody_str;
}

const amortizationData = () => {
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

const getData = () => {
    const amount = document.getElementById("amount").value;
    const n = document.getElementById("term").value;
    const period = document.getElementById("term-period").value;
    const i = document.getElementById("rate").value;
    const type = document.getElementById("int-type").value;
    const term = paymentPeriod(n, period);
    const iRate = interest(i, type);
    const toPay = monthlyPay(amount, term, iRate);
    return{initBalance: amount, int: iRate, fee: toPay}
}