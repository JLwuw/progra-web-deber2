import { useState, useEffect } from 'react'
import WeatherSection from "./components/WeatherSection.jsx"
import LoadingState from './components/LoadingState.jsx'
import ErrorState from './components/ErrorState.jsx'

const BASE_URL = "http://api.weatherapi.com/v1/current.json"
const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY

function App() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [city, setCity] = useState('')
  const [data, setData] = useState(null)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    async function getWeatherData() {
      console.log("useEffect triggered! Fetching Data")

      if (!city) {
        console.log("No city: " + city)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const url = BASE_URL + `?key=${API_KEY}&q=${encodeURIComponent(city)}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`No se pudo encontrar info para la cuidad: '${city}' `)
        }

        const data = await response.json()

        const weather_data = [
          {title: "Temperature", emoji: "🌡️", value: `${data.current.temp_c} °C`},
          {title: "Condition", icon: data.current.condition.icon, value: data.current.condition.text},
        ]

        setData(weather_data)
      
      } catch(err) {
        console.log("Error: " + err.message)
        setError(err.message)
      
      } finally {
        setLoading(false)
      }
    }

    getWeatherData()

  }, [city, attempts])


  function onClickSearch() {
    console.log("Click Search Button!")
    if (inputValue === '') {
      return
    }
    console.log("Setting value!")
    setCity(inputValue)
  }

  function onRetry() {
    setAttempts((previous) => previous += 1)
    onClickSearch()
  }

  return (
    <>
      <div className="app">
        <div className="header">
          <h1>Explorador de Clima Ciudades 🌦️</h1>
        </div>

        <div className="search-bar">
            <input 
              type="text" 
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button onClick={onClickSearch}> 
                Buscar... 
            </button>
        </div>

        {loading && <LoadingState/>}
        {!loading && error && <ErrorState message={error} onRetry={onRetry}/>}
        {!loading && !error && data && <WeatherSection data={data}/>}
      </div>
    </>
  )
}

export default App
