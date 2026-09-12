import { useState } from 'react'

const BASE_URL = "http://api.weatherapi.com/v1/current.json"
const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY


function App() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(0)
  const [data, setData] = useState(null)
  const [city, setCity] = useState('')

  async function onClickSearch() {
    console.log("clicked search! Fetching Data")

    if (city === '') {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const url = BASE_URL + `?key=${API_KEY}&q=${encodeURIComponent(city)}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Unable to find weather information for ${city}`)
      }
      setData(response.json())
      
    } catch(err) {
      console.log("Error: " + err.message)
      setError(err.message)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="header">
        <h1>Explorador de Clima Ciudades 🌦️</h1>
      </div>

      <div className="search-bar">
          <input 
            type="text" 
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button onClick={onClickSearch}> 
              Buscar... 
          </button>
      </div>
    </>
  )
}

export default App
