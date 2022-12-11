document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        switchLang();
    }
})

const switchLang = () => {
    const navText = document.querySelector('#switch-lang');

    navText.addEventListener("click", (event) => {
        const title = document.querySelector('#title');
        const pLabel = document.querySelector('#p-label');
        const nLabel = document.querySelector('#n-label');
        const termLabel1 = document.querySelector('#month');
        const termLabel2 = document.querySelector('#year');
        const iLabel = document.querySelector('#i-label');
        const typeLabel1 = document.querySelector('#em');
        const typeLabel2 = document.querySelector('#ea');
        const typeLabel3 = document.querySelector('#nm');
        const button = document.querySelector('#btn');

        const language = event.target.textContent;
        if (language.includes('español')) {
            event.target.innerHTML = 'Switch to english <img id="flag-icon" src="/img/uk.png" alt="flag" style="width:30px;">';
            title.textContent = 'Calculadora De Créditos';
            pLabel.textContent = 'Monto del préstamo';
            nLabel.textContent = 'Plazo';
            termLabel1.textContent = 'Meses';
            termLabel2.textContent = 'Años';
            iLabel.textContent = 'Tasa de interés';
            typeLabel1.textContent = 'Efectivo mensual';
            typeLabel2.textContent = 'Efectivo anual';
            typeLabel3.textContent = 'Nominal Mes Vencido';
            button.textContent = 'Calcular';
        } else {
            event.target.innerHTML = 'Cambiar a español <img id="flag-icon" src="/img/spain.png" alt="flag" style="width:30px;">';
            title.textContent = 'Credit Calculator';
            pLabel.textContent = 'Loan Amount';
            nLabel.textContent = 'Loan Term';
            termLabel1.textContent = 'Months';
            termLabel2.textContent = 'Years';
            iLabel.textContent = 'Interest Rate';
            typeLabel1.textContent = 'Effective Monthly';
            typeLabel2.textContent = 'Effective Annual';
            typeLabel3.textContent = 'Nominal Compounded Monthly';
            button.textContent = 'Calculate';
        }        
    })
}