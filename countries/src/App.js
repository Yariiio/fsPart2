import { useState, useEffect } from "react";
import axios from 'axios'

const DetailedCountry = ({country, weather}) => (
  <div>
    <h2>{country.name.common}</h2>
    <h4>capital {country.capital}</h4>
    <h4>area {country.area}</h4>
    <h3>languages:</h3>
    <ul>
      {Object.keys(country.languages).map(language => {
        return (
          <li>{country.languages[language]}</li>
        )
      })}
    </ul>
    <img src={country.flags['png']} alt='flag'/>
    <h2>Weather in {country.capital}</h2>
    <p>Temperature {weather.main.temp} Celsius</p>
    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.name}/>
    <p>Wind {weather.wind.speed}m/s</p>
  </div>
)

const Country = ({country, filteredCountries}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [showDetails, setShowDetails] = useState(false)
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data)
    })
  }, [])

  if(filteredCountries.length === 1 || showDetails)  return <DetailedCountry key={country.name.common} country={country} weather={weather} />
  if(showDetails === false) return <h4>{country.name.common} <button onClick={() => setShowDetails(!showDetails)}>view</button></h4>
}

const Countries = ({countries, filteredSearch}) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(filteredSearch.toLowerCase()))  

  if (filteredCountries.length > 10 && filteredSearch !== '') return <p>Too many matches, specify another filter</p>

  if (filteredCountries.length <= 10) {
    return(
      <div>
        {filteredCountries.map(country => {
          return (
            <Country country={country} key={country.name.common} filteredCountries={filteredCountries}/>
          )
        })}
      </div>
    )
  }
}  
    

const App = () => {

  const [countries, setCountries] = useState([])
  const [filteredSearch, setFilteredSearch] = useState("")

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  console.log(countries)
 
  const handleChange = (event) => {
    setFilteredSearch(event.target.value)
  }

  return (
    <div className="App">
        find countries <input type='text' onChange={handleChange} />
        <Countries countries={countries} filteredSearch={filteredSearch} />
    </div>
  );
}

export default App;
