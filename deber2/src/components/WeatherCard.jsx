
function WeatherCard({title, emoji, icon, value}) {
  return (
    <div className="weather-card">
      <h2 className="title">{title}</h2>

      {icon != null ? (
        <img src={icon} alt="icon" />
      ) : (
        <p className="emoji">{emoji}</p>
      )}

      <p className="value">{value}</p>
    </div>
  )
}

export default WeatherCard