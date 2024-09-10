'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

///////////////////////////////////////
// const getCountryandNeighbor = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     rendercountry(data);

//     let [neighbour] = data.borders;
//     if (!neighbour) return;

//     // const currencyValues = Object.values(data.currencies);
//     // const languages = Object.values(data.languages);

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);

//       rendercountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryandNeighbor('somalia');
// getCountryandNeighbor('kenya');
// getCountryandNeighbor('uganda');

// my Own Try
// const requestCat = new XMLHttpRequest();
// requestCat.open('GET', 'https://cat-fact.herokuapp.com/facts');
// requestCat.send();

// requestCat.addEventListener('load', function () {
//   const catData = JSON.parse(this.responseText);
//   console.log(catData);
//   console.log(this.status);

// });

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => rendercountry(data[0]));
};
getCountryData('portugal');
getCountryData('somalia');
