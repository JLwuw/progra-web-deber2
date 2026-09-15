import WeatherCard from "./WeatherCard.jsx"

function WeatherSection({ cityName, data }) {
  return (
    <section className="weather-section" aria-labelledby="weather-city">
      <h2 id="weather-city" className="weather-city">{cityName}</h2>
      <div className="weather-grid">
        {data.map((weatherData) => (
          <WeatherCard key={weatherData.title} {...weatherData} />
        ))}
      </div>
    </section>
  )
}

export default WeatherSection