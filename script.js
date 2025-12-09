const countryList = document.getElementById('country-list');
const valuesList = document.getElementById('values-list');
const languagesList = document.getElementById('lenguages-list');

fetch('https://restcountries.com/v3.1/all?fields=name')
    .then(response => response.json())
    .then(countries => {
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        countries.forEach(country => insertCountry(country));

        const savedCountry = localStorage.getItem('selectedCountry');
        
        if (savedCountry) {
            countryList.value = savedCountry;
            countryList.dispatchEvent(new Event('change'));
        }
    });

function insertCountry(country) {
    const option = document.createElement('option');
    option.textContent = `${country.name.common}`;
    option.value = `${country.name.common}`;
    countryList.append(option);
}

countryList.addEventListener('change', (event) => {
    localStorage.setItem('selectedCountry', countryList.value);

    fetch(`https://restcountries.com/v3.1/name/${countryList.value}`)
        .then(response => response.json())
        .then(values => {
            valuesList.textContent = "";
            languagesList.textContent = "";
            values.forEach(value => insertValue(value));
        });
})

function insertValue(value) {
    const capital = document.createElement('li');
    const currency = document.createElement('li');
    const flag = document.createElement('img');
    const languages = document.createElement('li');

    capital.textContent = "Capital: " + (value.capital ? value.capital[0] : "N/A");
    
    if(value.currencies) {
        let key = Object.keys(value.currencies)[0];
        currency.textContent = "Currency: " + `${value.currencies[key].name}`;
    } else {
        currency.textContent = "Currency: N/A";
    }

    flag.src = `${value.flags.svg}`;
    
    valuesList.append(capital);
    valuesList.append(currency);

    if(value.languages) {
        let key = Object.keys(value.languages);
        languages.textContent = `${value.languages[key[0]]}`;
        languages.dataset.id = "language";
        valuesList.append(languages);
    }

    valuesList.append(flag);
}

valuesList.addEventListener('click', (event) => {
    const lang = event.target;
    if (lang.dataset.id === 'language') {
        fetch(`https://restcountries.com/v3.1/lang/${lang.textContent}`)
            .then(response => response.json())
            .then(languages => {
                languagesList.textContent = '';
                languages.forEach(language => insertLanguage(language));
            });
    }
});

function insertLanguage(language) {
    const img = document.createElement('img');
    img.src = `${language.flags.svg}`;
    languagesList.append(img);
}