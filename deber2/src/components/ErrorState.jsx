function ErrorState({ message, onRetry }) {
  return (
    <div className="state-error">
      <p>
        ⚠️ {message}
      </p>
      <button onClick={onRetry}>
        Reintentar
      </button>
    </div>
  )
}

export default ErrorState;