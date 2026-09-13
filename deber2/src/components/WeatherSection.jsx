import { useEffect } from "react"
import WeatherCard from "./WeatherCard.jsx"

function WeatherSection({data}) {
  return (
    <div className="weather-grid">
      {data.map((weatherData) => (
        <WeatherCard key={weatherData.title} {...weatherData} />
      ))}
    </div>
  )
}

export default WeatherSection