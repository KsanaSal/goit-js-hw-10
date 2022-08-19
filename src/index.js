import './css/styles.css';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.style.marginLeft = '40px';
info.style.padding = '40px';

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(data.length);
      if (data.length > 10) {
        console.log(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length === 1) {
        countryInfo(data[0]);
        console.log(data[0]);
        console.log('country-info');
      } else {
        countryList(data);
        console.log('country-list');
      }
      console.log(data.length);
    })
    .catch(() => {
      console.log('Oops, there is no country with that name');
      console.log(error);
    });
}
// fetchCountries('uk');

input.addEventListener(
  'input',
  debounce(event => {
    if (event.target.value.trim().length > 0) {
      fetchCountries(event.target.value.trim());
      console.log(event.target.value);
    }
  }, DEBOUNCE_DELAY)
);

function countryList(data) {
  list.innerHTML = '';
  info.innerHTML = '';
  const countries = data
    .map(
      ({
        name: { official },
        flags: { svg },
      }) => `<li style = "list-style:none; font-size:28px;">
      <img src="${svg}" width="35" alt="${official}"/>
  ${official}
  </li>`
    )
    .join('');
  list.insertAdjacentHTML('afterbegin', countries);
  console.log(countries);
}

function countryInfo(card) {
  info.innerHTML = '';
  list.innerHTML = '';
  const {
    name: { official },
    flags: { svg },
    population,
    capital,
    languages,
  } = card;
  const listOfLanguages = [];
  for (const key in languages) {
    listOfLanguages.push(languages[key]);
  }
  console.log(languages);
  const countryCard = `
  <h1 style = "font-size:42px"><img src="${svg}" width="35" alt="${official}"> ${official}</h1>
  <ul style = "list-style:none; padding:0; font-size:24px">
  <li><strong>Capital:</strong> ${capital}</li>
  <li><strong>Population:</strong> ${population}</li>
  <li><strong>Languages:</strong> ${listOfLanguages.join(', ')}</li>
  </ul>
  `;
  info.insertAdjacentHTML('afterbegin', countryCard);
  console.log(countryCard);
}
