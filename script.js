'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//https://restcountries.com/v3.1/name/{name}
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest(); //old school AJAX call
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    const [currencies] = Object.values(data.currencies);
    const [languages] = Object.values(data.languages);
    //console.log(data.flags.png);
    console.log(data);

    const html = `<article class="country">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} mil people</p>
        <p class="country__row"><span>🗣️</span>${languages}</p>
        <p class="country__row"><span>💰</span>${currencies.name}</p>
      </div>
    </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('portugal');
getCountryData('usa');
*/

const renderCountry = function (data, className = '') {
  //console.log(data.currencies);
  const [currencies] = Object.values(data.currencies);
  const [languages] = Object.values(data.languages);
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} mil people</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${currencies.name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbor = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest(); //old school AJAX call
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);

    //console.log(data.flags.png);
    console.log(data);

    //render country 1
    renderCountry(data);
    //Get neighbor country (2)
    const [neighbor] = data.borders;
    if (!neighbor) return;
    const request2 = new XMLHttpRequest(); //old school AJAX call
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

//getCountryAndNeighbor('usa');

/////// MODERN WAY TO MAKE AJAX CALLS /////////////////////
/* old way vvvvvvvvvv
const request = new XMLHttpRequest(); //old school AJAX call
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
*/
// modern way - vvvv
//const request = fetch('https://restcountries.com/v3.1/name/portugal');
//console.log(request);
//need to call json to read the response, returns a promise, have to call then on it to get data.
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryData('Saudi Arabia');
