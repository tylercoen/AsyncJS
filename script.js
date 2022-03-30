'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const renderCountry = function (data, className = '') {
  //console.log(data);
  //const languages = Object.values(data.languages);
  //const currencies = Object.values(data.currencies);
  const html = `<article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} mil people</p>
        <p class="country__row"><span>🗣️</span>${
          data.languages[Object.keys(data.languages)[0]]
        }</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[Object.keys(data.currencies)[0]].name
        }</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
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
/*
const getCountryAndNeighbor = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest(); //old school AJAX call
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);

    //console.log(data.flags.png);
    //console.log(data);

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
*/
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
/*
const getJSON = function (url, errorMsg = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  //country 2
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found!');
      //country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      //catches any errors in the whole promise chain
      //console.error(`${err}💥💥💥💥`);
      renderError(`Something went wrong 💥💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      //for something that always needs to happen no matter the result of the promise
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('germany');
});
//getCountryData('oqhefouqhfuie'); handled this error with the Country not found error created above
getCountryData('australia');
*/

/*Coding Challenge #1
In this challenge you will build a function 'whereAmI' that renders a country only based on GPS coordinates. For that, you will use a second API to geocode coordinates. So in this challenge, you'll use an API on your own for the first time.
Your tasks:
Part 1
1. Create a function 'whereAmI' which takes as an input a latitude value ('lat') and a longitude value ('lng').
2. Do "reverse geocoding" of the provided geocoordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city or country name. Ise this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating.
3. Once you have the data, take a look at it in the console to see all the attributes taht you received about the provided location. Then, using this data, log a lessage like this to the console: "You are in Berlin, Germany"
4. Chain a .catch method to the end of the promise chain and log errors to the console.
5. This API will allow you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create an error to reject the promise youself, with a meaningful error message.
Part 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code no need to type the same code)
Test Data:
Coordinates1: 52.508, 13.381 (lat, lng)
Coordinates2: 19.037, 72.873
Coordinates3: -33.933, 18.474
*/
/*
/////////////// Finding country w/ lat/long
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`${response.status} wait a little while longer`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not founds(${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err.message}💥💥💥`);
    });
};
whereAmI(52.508, 13.381);
*/
/////////// ASYNCHRONOUS EVENT LOOP //////////////
/*
console.log('Test start'); //return 1st
setTimeout(() => console.log('0 sec timer'), 0); //return 5th
Promise.resolve('Resolved promise 1').then(res => console.log(res)); //return 3rd
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 10000000; i++) {} //return 4th
  console.log(res);
});
console.log('Test end'); //return 2nd
*/
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🏆');
    } else {
      reject(new Error('You lost💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying setTimeout
const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('That took two seconds');
    return wait(1);
  })
  .then(() => console.log('That took one second'));

Promise.resolve('Resolves immediately').then(x => console.log(x));
Promise.reject('Promise immediately rejected').catch(x => console.error(x));
*/
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })

    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`${response.status} wait a little while longer`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not founds(${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err.message}💥💥💥`);
    });
};

btn.addEventListener('click', whereAmI);
*/
///////////////////////////////////////////////////
//Coding Challenge #2
/*
For this challenge you will actually have to watch the video. Then, build the image loading functionality that I just showed you on screen.

Your tasks:
Tasks are not super descriptive this time, so you can figure out some stuff by yourself. Pretend you're working on your own.
//Part 1
1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img)) and sets the .src attribute to the provided image path (check sidebar).
2. When the iamge is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the 'error' event) reject the promise.
3. If this part is too tricky for you, just watch the first part of the solution.

//Part 2
4. Consume the promise using.then and also add an error handler.
5. After the imge has loaded, pause execution for 2 seconds using the 'wait' function we created earlier.

6. After the 2 seconds have passed, hide the current image (set display CSS property to 'none'), and load a second image (Hint: use the image element returned by the 'createImage' promise to hide the current image). You will need a global variable for that).
7. After the second image has loaded, pause execution for 2 seconds again.
8. After the 2 seconds have passed, hide the current image.

Test data: images in the img folder. Test the error handler by passing a wrong img path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise the images load too fast.
*/

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = imgPath => {
  return new Promise(
    resolve => {
      const newImg = document.createElement('img');
      newImg.src = imgPath;
      newImg.addEventListener('load', function () {
        const nearestImgClass = document.querySelector('.images');
        const removeButton = document.querySelector('button');
        if (removeButton !== null) {
          removeButton.remove();
        }

        nearestImgClass.insertAdjacentElement('afterbegin', newImg);
      });
    },
    reject => {
      new Error('Image failed to load');
    }
  ).catch(err => {
    console.error(`${err.message}`);
  });
};
wait(2)
  .then(() => {
    document.querySelector('img').style.display = 'none';
  })
  .then(() => {
    createImage('img/img-2.jpg');
  });

createImage('img/img-1.jpg');

//inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
