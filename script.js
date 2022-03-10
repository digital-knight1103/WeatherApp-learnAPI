const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=cb9978200bb0e9db624e9284ca04b20a'
const API_UNITS = '&units=metric'

//how to build URL - read the documentation API call
//Built-in API request by city name

const getWeather = () => {
  const city = input.value || "Mrozów"
  const URL = API_LINK + city + API_KEY + API_UNITS

  axios.get(URL)
    .then(res => {
      console.log(res);
      const temp = res.data.main.temp
      const hum = res.data.main.humidity
      const status = Object.assign({}, ...res.data.weather)
      console.log(status);
      

      //Odwołujemy się do naszego H3 
      cityName.textContent = res.data.name

      //Odwołujemy się do naszych paragrafów i przypisujemy im wartości
      temperature.textContent = temp.toFixed() + '℃'
      humidity.textContent = hum + '%'
      weather.textContent = status.main

      //Warning - czyszczenie paragrafu z klasą warning oraz inputa
      warning.textContent = ''
      input.value = ''



      // moglibyśmy równiez zapisać bez zminnych
      // temperature.textContent = Math.floor(res.data.main.temp) + '℃'
      // humidity.textContent = res.data.main.humidity + '%' 
      
      //Zmiana obrazka pogody - możemy skorzystac z obrazków w API ale my mamy swoje. (res.data.weather) druga metoda uzyta to object.assign
      // console.log(res.data.weather[0].id);


      //Stworzymy if zależnego od status.id generujący nam oinformacje o danej pogodzie
      //np: 800===sun, 200-300.. są to info z api weather

      if(status.id >=200 && status.id <=300) {
        photo.setAttribute('src', './img/thunderstorm.png')
      } else if (status.id >=300 && status.id <= 400) {
        photo.setAttribute('src', './img/drizzle.png')
      } else if (status.id >= 500 && status.id <= 600) {
        photo.setAttribute('src', './img/rain.png')
      } else if (status.id >=600 && status.id <= 700) {
        photo.setAttribute('src', './img/ice.png')
      } else if (status.id >= 700 && status.id <= 800) {
        photo.setAttribute('src', './img/fog.png')
      } else if (status.id === 800) {
        photo.setAttribute('src', './img/sun.png')
      } else if (status.id >= 800 && status.id <= 900) {
        photo.setAttribute('src', './img/cloud.png')
      } else {
        photo.setAttribute('src', './img/unknown.png')
      }

    
    }) .catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta!')
}

//funkcja po kliku na enter wywołaj funkcję 
const clickEnter = (e) => {
  if(e.key === 'Enter') {
    getWeather()
  }
}

input.addEventListener('keyup', clickEnter)
getWeather()
button.addEventListener('click', getWeather)