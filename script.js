'use strict';

const btn = document.querySelector('.btn-country');
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

Cbtn.addEventListener('click', function () {
  const inputValue = input.value;
  fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
    .then(response => {
      if (!response.ok)
        throw new Error(`there is no Country names ${inputValue}`);
      return response.json();
    })
    .then(data => {
      // console.log(data.borders[0]);
      const [neighbour] = data[0].borders;
      console.log(neighbour);
      console.log(data);
      // console.log(inputValue);

      rendercountry(data[0]);
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/name/${neighbour}`)
        .then(response => {
          if (!response.ok)
            throw new Error(`this  Country (${inputValue}) has No neigbor`);
          return response.json();
        })
        .then(data2 => {
          // console.log(data2[0].borders[0]);
          // const borders = data2[0].borders;
          console.log(data2[0].borders[0]);
          console.log(data2[0]);

          rendercountry(data2[0], 'neighbour');
        });
    })
    .catch(err => {
      console.log(err.message);
      // alert(`there is no country named ${inputValue} ${err}`);
      errorMassage.textContent = `${err.message}`;
    });
  input.value = '';
  errorMassage.textContent = '';
});

// getCountryData('portugal');
// getCountryData('somalia');
