import './css/styles.css';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        console.log(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length === 1) {
        console.log('country-info');
      } else {
        countryList(data);
        console.log('country-list');
      }
      console.log(data.length);
    })
    .catch(() => {
      console.log('Oops, there is no country with that name');
      //   console.log(error)
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
      }) => `<li style = "list-style:none; font-size:24px;">
      <img src="${svg}" width="50" alt="${official}"/>
  ${official}
  </li>`
    )
    .join('');
  list.insertAdjacentHTML('afterbegin', countries);
  console.log(countries);
}
