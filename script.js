// Recovering on the page the elements that serve us
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const suggestionParagraph = document.querySelector('.suggestion');

// This is the tag <html>
const rootElement = document.documentElement;

// Retrieving the current position
window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

// Function to run in case of error
function onError(error) {
  console.error(error);
  weatherLocation.innerText = 'You need to activate your geolocation';
}

// Function to run in case of success
function onSuccess(position) {
  console.log(position);

  // Preparing the datas for the API
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiKey = 'bd832622acc99b03e95f5648052a97cf';
  const language = 'it';
  const units = 'metric';
  const endpoint = 'https://api.openweathermap.org/data/2.5/weather';

  // We built the address, including query strings!
  const apiUri = `${endpoint}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${language}&appid=${apiKey}`;

  // Calling our external service
  fetch(apiUri)
    .then(function (response) {
      // Turning my answer into a leaner, more readable format
      const data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);

      // Estrapoliamo le informazioni di cui abbiamo bisogno
      const locationName = data.name;
      const temperature = Math.floor(data.main.temp);
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;

      // We have prepared a fair council
      const suggestion = getSuggestion(iconCode);

      // We insert the data where we want to show it
      weatherLocation.innerText = locationName;
      weatherTemperature.innerText = `${temperature}°`;
      weatherIcon.alt = description;
      weatherIcon.src = `images/${iconCode}.png`;
      suggestionParagraph.innerHTML = suggestion;

      // Removing the class'js-loading'
      rootElement.classList.remove('js-loading');
    });
}

// Function to retrieve the correct phrases
function getSuggestion(iconCode) {
  const suggestions = {
    '01d': 'Ricordati la crema solare!',
    '01n': 'Buonanotte!',
    '02d': 'Oggi il sole va e viene...',
    '02n': 'Attenti ai lupi mannari...',
    '03d': 'Luce perfetta per fare foto!',
    '03n': 'Dormi sereno :)',
    '04d': 'Che cielo grigio :(',
    '04n': 'Non si vede nemmeno la luna!',
    '09d': 'Prendi l\'ombrello',
    '09n': 'Copriti bene!',
    '10d': 'Prendi l\'ombrello',
    '10n': 'Copriti bene!',
    '11d': 'Attento ai fulmini!',
    '11n': 'I lampi accendono la notte!',
    '13d': 'Esci a fare un pupazzo di neve!',
    '13n': 'Notte perfetta per stare sotto il piumone!',
    '50d': 'Accendi i fendinebbia!',
    '50n': 'Guida con prudenza!',
  }
  return suggestions[iconCode];
}