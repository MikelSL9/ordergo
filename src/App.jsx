import { useState } from 'react';
import './App.css'

function App() {

  const [customerName, setCustomerName] = useState('')
  const [submittedCustomerName, setSubmittedCustomerName] = useState('')
  const [errorName, setErrorName] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = customerName.trim()

    if (!trimmedName) {
      setErrorName(true)
      return
    }

    setSubmittedCustomerName(trimmedName)
    setCustomerName('')
    setErrorName(false)
  }

  return (
    <main className='app'>
      <header className='app-header'>
        <h1>OrderGo</h1>
        <p>Gestión rápida de pedidos</p>
      </header>
      <h2>Nuevo pedido:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor='name'>Nombre completo: </label>
          <input
            type="text"
            id='name'
            name='name'
            autoComplete='name'
            required
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />

          {errorName && (
            <span>El nombre no es válido</span>
          )}
        </div>
        <button type='submit'>Enviar</button>
      </form>

      {submittedCustomerName && (
        <p>Último cliente registrado: {submittedCustomerName}</p>
      )}

    </main>
  )
}

export default App
