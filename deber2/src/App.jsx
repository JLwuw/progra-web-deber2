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
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    async function getWeatherData() {
      if (!city) {
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
        setDisplayName(data.location.name)
      
      } catch(err) {
        setError(err.message)
      
      } finally {
        setLoading(false)
      }
    }

    getWeatherData()

  }, [city, attempts])


  function onClickSearch() {
    if (inputValue === '') {
      return
    }
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
          <h1>City Climate Searcher 🌦️</h1>
        </div>

        <div className="search-bar">
            <input 
              type="text" 
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button onClick={onClickSearch}> 
                Search... 
            </button>
        </div>

        {loading && <LoadingState/>}
        {!loading && error && <ErrorState message={error} onRetry={onRetry}/>}
        {!loading && !error && data && <WeatherSection cityName={displayName} data={data}/>} 
      </div>
    </>
  )
}

export default App
