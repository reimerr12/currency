const formAmountElement = document.getElementById("amount");
const convertedAmountElement = document.getElementById("converted-amount");
const fromCurrencyElement = document.getElementById("from-currency");
const toCurrencyElement = document.getElementById("to-currency");
const resultElement = document.getElementById("results");
const ConverterContainer = document.getElementById("converter-container");

//array to populate select tags with countries
const countries =[ {code:"USD",name : "United States Dollar"},
    {code:"BDT",name : "Bangladeshi Taka"},
    {code:"INR",name : "Indian Rupee"},
];

//showing the country array

countries.forEach(function(country){
    const opt1 = document.createElement('option');
    const opt2 = document.createElement('option');

    opt1.value = opt2.value =country.code;
    opt1.textContent = opt2.textContent =`${country.code}(${country.name})`;

    fromCurrencyElement.appendChild(opt1);
    toCurrencyElement.appendChild(opt2);

    
});

async function getExchangeRate(){
    const amount = (formAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "fetching rates....";

    try{
    //fetch data from api
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
   
    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate);  
    convertedAmountElement.value = convertedAmount.toFixed(2);

    resultElement.textContent=`${amount} ${fromCurrency} = ${convertedAmount}${toCurrency}`;
    }catch(error){
        ConverterContainer.innerHTML = '<h1>error!!!!</h1>';
    }
    
}

formAmountElement.addEventListener('input', getExchangeRate);
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);
window.addEventListener('load', getExchangeRate);