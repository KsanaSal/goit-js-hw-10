import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

//
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
// Вибір елементів HTML
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

// Встановлення стилів
input.style.marginLeft = '40px';
info.style.padding = '40px';

// Слухач input
input.addEventListener(
  'input',
  debounce(event => {
    if (event.target.value.trim().length > 0) {
      fetchCountries(event.target.value.trim())
        .then(data => {
          if (data.length > 10) {
            Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
            clearCountries();
          } else if (data.length === 1) {
            countryInfo(data[0]);
          } else {
            countryList(data);
          }
        })
        .catch(() => {
          Notify.failure('Oops, there is no country with that name');
          clearCountries();
        });
    }
  }, DEBOUNCE_DELAY)
);

// Очищення інформації про країни
function clearCountries() {
  list.innerHTML = '';
  info.innerHTML = '';
}

// Створення списку країн
function countryList(data) {
  clearCountries();
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
}

// Створення картки вибраної країни
function countryInfo(card) {
  clearCountries();
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
  const countryCard = `
  <h1 style = "font-size:42px"><img src="${svg}" width="35" alt="${official}"> ${official}</h1>
  <ul style = "list-style:none; padding:0; font-size:24px">
  <li><strong>Capital:</strong> ${capital}</li>
  <li><strong>Population:</strong> ${population}</li>
  <li><strong>Languages:</strong> ${listOfLanguages.join(', ')}</li>
  </ul>
  `;
  info.insertAdjacentHTML('afterbegin', countryCard);
}
