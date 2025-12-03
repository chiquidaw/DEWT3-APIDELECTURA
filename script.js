const countryList = document.getElementById('country-list');
const valuesList = document.getElementById('values-list');
const lenguagesList = document.getElementById('lenguages-list');

fetch('https://restcountries.com/v3.1/all?fields=name')
    .then(response => response.json())
    .then(countries => {
        countries.forEach(country => insertCountry(country));
    });

function insertCountry(country) {
    const option = document.createElement('option');
    option.textContent = `${country.name.common}`;
    countryList.append(option);
}

countryList.addEventListener('change', (event) => {
    fetch(`https://restcountries.com/v3.1/name/${countryList.value}`)
        .then(response => response.json())
        .then(values => {
            valuesList.textContent = "";
            values.forEach(value => insertValue(value));
        });
})

function insertValue(value) {
    const capital = document.createElement('li');
    const currency = document.createElement('li');
    const flag = document.createElement('img');
    const languages = document.createElement('li');

    capital.textContent = "Capital: " + `${value.capital}`;
    let key = Object.keys(value.currencies)[0];
    currency.textContent = "Moneda: " + `${value.currencies[key].name}`;
    flag.src = `${value.flags.svg}`;
    key = Object.keys(value.languages);
    languages.textContent = `Lengua (Una de ellas): ${value.languages[key[0]]}`;

    valuesList.append(capital);
    valuesList.append(currency);
    valuesList.append(languages);
    valuesList.append(flag);
}