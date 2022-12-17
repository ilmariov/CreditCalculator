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

        if (validator()) {
            document.getElementById('alert').textContent = '';
            const value = getValues();
            const term = paymentPeriod(value.n, value.period);
            const iRate = interest(value.i, value.type);
            const toPay = monthlyPay(value.principal, term, iRate);
            const amtzLink = document.getElementById('amtz-link');        
            const div = document.getElementById("fee");
            const submit_btn = document.querySelector('#btn');
            if (submit_btn.textContent.includes('Calculate')) {
                amtzLink.innerHTML = `
                Click to display <strong style="color: #ff8800;">Amortization Table</strong>
                `;
                div.innerHTML = "<h3>Monthly payment = $ " + numEdition(toPay) + "</h3>";
            } else {
                amtzLink.innerHTML = `
                Click para desplegar <strong style="color: #ff8800;">Tabla de Amortización</strong>
                `;
                div.innerHTML = "<h3>Cuota mensual = $ " + numEdition(toPay) + "</h3>";
            }
        } else {
            const div_alert = document.getElementById('alert');
            div_alert.innerHTML = `<div id='alert-cont' class="alert alert-danger alert-dismissible"></div>`;
            const alertContainer = document.getElementById('alert-cont');
            const calc_button = document.querySelector('#btn');
            if (calc_button.textContent.includes('Calculate')) {
                alertContainer.innerHTML = `
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <strong>Warning!</strong> Enter data within a valid range for real-purpose calculation.
                `;
            } else {
                alertContainer.innerHTML = `
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <strong>Cuidado!</strong> Ingrese datos dentro de un rango válido para cálculos reales.
                `;
            }
            printOff();
        }        
    })
}

const getValues = () => {
    const p = document.getElementById("amount").value;
    const n = document.getElementById("term").value;
    const period = document.getElementById("term-period").value;
    const i = document.getElementById("rate").value;
    const type = document.getElementById("int-type").value;
    return {principal: p, n: n, period: period, i: i, type: type}
}

const numEdition = (num) => {
    const splitted = num.toFixed(2).toString().split('.');
    let integer = Number(splitted[0]);
    const numSections = [];
    const decimal = splitted[1];
    while(integer >= 1000) {
        const splitInt = (integer / 1000).toFixed(3).toString().split('.');
        numSections.unshift(splitInt[1]);
        integer = Number(splitInt[0]);
    }
    numSections.unshift(integer.toString());
    switch (numSections.length) {
        case(1): return numSections[0] + '.' + decimal;
        case(2): return numSections[0] + ',' + numSections[1] + '.' + decimal;
        default: {
            let edited = numSections[0];
            for (let i = 1; i < numSections.length; i++) {
                if (numSections.length % 2 === 0) {
                    if (i % 2 !== 0) {
                        edited = edited + ',' + numSections[i];
                    } else {
                        edited = edited + "'" + numSections[i];
                    }
                } else {
                    if (i % 2 === 0) {
                        edited = edited + ',' + numSections[i];
                    } else {
                        edited = edited + "'" + numSections[i];
                    }
                }
            }
            return edited + '.' + decimal;
        }
    } 
}

const interest = (i, type) => {
    return (type === 'em') ? i/100
            : (type === 'ea') ? ((1 + (i/100)) ** (1/12)) - 1
            : i / 1200;
}   

const monthlyPay = (p, n, iR) => {return p * (iR * ((1 + iR) ** n)) / (((1 + iR) ** n) - 1)};

const paymentPeriod = (n, period) => (period === 'months') ? n : n * 12;

const validator = () => {
    const term = document.getElementById('term').value;
    const rate = document.getElementById('rate').value;
    const period = document.getElementById('term-period').value;
    const int_type = document.getElementById('int-type').value;
    const state1 = (period === 'months' && term > 360) || (period === 'years' && term > 30);
    const state2 = (int_type === 'em' && rate > 8) || (int_type !== 'em' && rate > 100);
    switch (state1 || state2) {
        case(true): return false;
        default: return true;
    }
}

function resetForm() {
    printOff()
    document.getElementById('calcForm').reset();
    window.location.reload();
}

const printOff = () => {
    document.getElementById('amtz-link').innerHTML = '';
    document.getElementById('fee').textContent = '';
    document.getElementById('table-div').innerHTML = '';
}