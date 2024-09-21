'use strict';

const btn = document.querySelector('.btn-country');
// console.log(btn);
const countriesContainer = document.querySelector('.countries');
const Cbtn = document.querySelector('.input-btn');
const input = document.querySelector('input');
const errorMassage = document.querySelector('.error-massage');

const rendercountry = function (data, className = '') {
  const currencyValues = Object.values(data.currencies);

  const languages = Object.values(data.languages);
  const html = `<article class="country ${className}">
    <img class="country__img" src=${data.flags.png} />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.continents[0]}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M</p>
      <p class="country__row"><span>🗣️</span>${languages[0]}</p>
      <p class="country__row"><span>💰</span>${currencyValues[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const searchCountry = async function () {
  console.log('click');
  let inputValue = input.value;

  const response = await fetch(
    `https://restcountries.com/v3.1/name/${inputValue}`
  );
  const data = await response.json();
  rendercountry(data[0]);

  input.value = '';
};

Cbtn.addEventListener('click', searchCountry);
